import { Effect } from "effect";
import gsap from "gsap";
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import { adjustScrollY, blockScrollY } from "./calc";
import { codeMirrorScroller, previewScroller } from "./query";
import { SourceMap } from "./types";

function useScrollSyncing(
	sourceMap: Accessor<SourceMap>,
	lineNumber: Accessor<number>,
) {
	// Tracks whether or not the scroll syncing is enabled.
	const [isSyncing, setIsSyncing] = createSignal<boolean>(false);

	const toggleSyncing = () => {
		setIsSyncing((prev) => !prev);
	};

	// Tracks the current tween so we can kill it if necessary.
	let currentTween: gsap.core.Tween | null = null;

	// An effect that syncs the scroller with the cursor.
	const syncScroller = Effect.gen(function* () {
		if (!isSyncing()) {
			return;
		}

		if (currentTween) {
			currentTween.kill();
		}

		const block = sourceMap()[lineNumber()];
		const lastLineNumber = Object.keys(sourceMap()).length;

		const scroller = yield* previewScroller;
		const scrollY = yield* blockScrollY(block, lineNumber());

		const adjustedScrollY = yield* adjustScrollY(
			scrollY,
			lineNumber(),
			lastLineNumber,
		);

		currentTween = gsap.to(scroller, {
			scrollTop: adjustedScrollY,
			duration: 0.1,
			ease: "none",
		});
	});

	const syncScrollerCallback = () => {
		Effect.runSync(syncScroller);
	};

	const setupScrollSyncing = Effect.gen(function* () {
		const scroller = yield* codeMirrorScroller;
		scroller.addEventListener("scroll", syncScrollerCallback);
	});

	const cleanupScrollSyncing = Effect.gen(function* () {
		const scroller = yield* codeMirrorScroller;
		scroller.removeEventListener("scroll", syncScrollerCallback);
	});

	createEffect(() => {
		syncScrollerCallback();
	});

	onCleanup(() => {
		Effect.runSync(
			cleanupScrollSyncing.pipe(
				Effect.catchAll(() => {
					const reason = "Element removed, no cleanup needed.";
					return Effect.succeed(reason);
				}),
			),
		);
	});

	return {
		setupScrollSyncing,
		isSyncing,
		toggleSyncing,
	};
}

export { useScrollSyncing };
