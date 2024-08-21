import { Effect } from "effect";
import gsap from "gsap";
import { Accessor, createEffect, createSignal } from "solid-js";
import { snapScrollToEdges, getBlockScrollY } from "./calc";
import { queryCodeMirrorScroller, queryPreviewScroller } from "./query";
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

		if (!block) {
			return;
		}

		const lastLineNumber = Object.keys(sourceMap()).length;

		const scroller = yield* queryPreviewScroller;
		const scrollY = yield* getBlockScrollY(block, lineNumber());

		const adjustedScrollY = yield* snapScrollToEdges(
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
		const scroller = yield* queryCodeMirrorScroller;
		scroller.addEventListener("scroll", syncScrollerCallback);
	});

	createEffect(() => {
		syncScrollerCallback();
	});

	return {
		setupScrollSyncing,
		isSyncing,
		toggleSyncing,
	};
}

export { useScrollSyncing };
