import { Effect, Option } from "effect";
import gsap from "gsap";
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

type Block = ElementBlock | EmptyBlock;

/**
 * Relates line numbers in the source document to its rendered DOM element.
 * `[start, end]` is a fully inclusive range.
 */
type ElementBlock = {
	type: "element";
	start: number;
	end: number;
	selector: string;
};

/**
 * Relates line numbers in the source document to the space in between
 * rendered DOM elements (e.g., the space between two paragraphs).
 * `[start, end]` is a fully inclusive range.
 */
type EmptyBlock = {
	type: "empty";
	start: number;
	end: number;
	previous: ElementBlock;
	next: ElementBlock;
};

/**
 * Maps line numbers in the source document to corresponding DOM locations.
 */
type SourceMap = Record<number, Block>;

/**
 * A hook that synchronizes the preview scroller with the editor cursor.
 */
function useScrollSyncing(
	previewScroller: Accessor<Element | null>,
	sourceMap: Accessor<SourceMap>,
	lineNumber: Accessor<number>,
) {
	// Whether or not the scroll syncing is enabled.
	const [isSyncing, setIsSyncing] = createSignal<boolean>(false);

	// Keep track of the current tween so we can kill it if necessary.
	let currentTween: gsap.core.Tween | null = null;

	const killTween = Effect.sync(() => {
		if (currentTween) {
			currentTween.kill();
		}
	});

	const updateScroller = () => {
		Effect.runPromise(
			Effect.gen(function* () {
				if (!isSyncing()) {
					return;
				}

				if (currentTween) {
					yield* killTween;
				}

				const scroller = previewScroller();

				if (!scroller) {
					return;
				}

				const editorScroller = yield* editorScrollerQuery;

				const scrollY = yield* getPreviewScrollPosition(
					sourceMap(),
					lineNumber(),
					scroller,
				);

				Option.match(Option.all({ scrollY, editorScroller }), {
					onSome: ({ scrollY, editorScroller }) => {
						// If the scroll position is not exactly at the top or bottom,
						// but it's close enough, then we can treat it as such.
						const scrollTolerance = 20;

						const isEditorScrollerAtTop =
							editorScroller.scrollTop < scrollTolerance;

						const isEditorScrollerAtBottom =
							editorScroller.scrollTop + editorScroller.clientHeight >=
							editorScroller.scrollHeight - scrollTolerance;

						let adjustedScrollY = scrollY;

						if (lineNumber() === 1 && isEditorScrollerAtTop) {
							// Snap to the top.
							adjustedScrollY = 0;
						}

						const sourceMapSize = Object.keys(sourceMap()).length;

						if (
							lineNumber() >= sourceMapSize &&
							isEditorScrollerAtBottom
						) {
							// Snap to the bottom.
							adjustedScrollY = 999999;
						}

						currentTween = gsap.to(scroller, {
							scrollTop: adjustedScrollY,
							duration: 0.1,
							ease: "none",
						});
					},
					onNone: () => {
						console.log("Skipping scroll update.");
					},
				});
			}),
		);
	};

	const setupScrollSyncing = Effect.gen(function* () {
		const scroller = yield* editorScrollerQuery;

		Option.match(scroller, {
			onSome: (scroller) => {
				scroller.addEventListener("scroll", updateScroller);
			},
			onNone: () => {
				throw new Error("Editor scroller element not found.");
			},
		});
	});

	createEffect(() => {
		if (!isSyncing()) {
			return;
		}

		updateScroller();
	});

	onCleanup(() => {
		Effect.runPromise(
			Effect.gen(function* () {
				const scroller = yield* editorScrollerQuery;

				Option.match(scroller, {
					onSome: (scroller) => {
						scroller.removeEventListener("scroll", updateScroller);
					},
					onNone: () => {
						// No cleanup necessary.
					},
				});
			}),
		);
	});

	return {
		/**
		 * An effect that sets up the scroll syncing. This should be
		 * invoked when the component is mounting after the editor setup.
		 */
		setupScrollSyncing,

		/**
		 * Whether or not the scroll syncing is enabled.
		 */
		isSyncing,

		/**
		 * Set the scroll syncing state.
		 */
		setIsSyncing,
	};
}

/**
 * Gets the preview scroll position associated with the given line number.
 */
function getPreviewScrollPosition(
	sourceMap: SourceMap,
	lineNumber: number,
	previewScroller: Element,
) {
	return Effect.gen(function* () {
		const block = sourceMap[lineNumber];

		if (!block) {
			return Option.none<number>();
		}

		switch (block.type) {
			case "element": {
				const editorScroller = yield* editorScrollerQuery;
				const editorActiveLine = yield* editorActiveLineQuery;
				const previewBlock = yield* previewElementBlockQuery(block);

				const context = Option.all({
					editorScroller,
					editorActiveLine,
					previewScroller: Option.some(previewScroller),
					previewBlock,
				});

				return Option.map(context, (context) => {
					return getElementBlockPosition(block, lineNumber, context);
				});
			}

			case "empty": {
				const previewContext = Option.map(
					yield* previewEmptyBlockQuery(block),
					(emptyBlock) => ({
						previewBlockPrev: emptyBlock.previous,
						previewBlockNext: emptyBlock.next,
					}),
				);

				const editorContext = Option.all({
					editorScroller: yield* editorScrollerQuery,
					editorActiveLine: yield* editorActiveLineQuery,
				});

				const context = Option.zipWith(
					previewContext,
					editorContext,
					(preview, editor) => ({
						previewScroller,
						...preview,
						...editor,
					}),
				);

				return Option.map(context, (context) => {
					return getEmptyBlockPosition(block, lineNumber, context);
				});
			}

			default: {
				return Option.none<number>();
			}
		}
	});
}

/**
 * Queries the DOM for the element block associated with the given line number.
 */
function previewElementBlockQuery(block: ElementBlock) {
	return Effect.sync(() => {
		const element = document.querySelector(block.selector);
		return Option.fromNullable(element);
	});
}

/**
 * Queries the DOM for the empty block associated with the given line number.
 * The empty block implicitly exists between two element blocks.
 */
function previewEmptyBlockQuery(block: EmptyBlock) {
	return Effect.sync(() => {
		const previous = document.querySelector(block.previous.selector);
		const next = document.querySelector(block.next.selector);

		if (previous && next) {
			return Option.some({ previous, next } as const);
		}

		return Option.none();
	});
}

/**
 * Queries the DOM for the editor scroller.
 */
const editorScrollerQuery = Effect.sync(() => {
	const element = document.querySelector(".cm-scroller");
	return Option.fromNullable(element);
});

/**
 * Queries the DOM for the active line in the editor.
 */
const editorActiveLineQuery = Effect.sync(() => {
	const element = document.querySelector(".cm-activeLine");
	return Option.fromNullable(element);
});

/**
 * Gets the scroll position for an element block.
 */
function getElementBlockPosition(
	block: ElementBlock,
	lineNumber: number,
	context: {
		editorScroller: Element;
		editorActiveLine: Element;
		previewScroller: Element;
		previewBlock: Element;
	},
): number {
	const { editorScroller, editorActiveLine, previewScroller, previewBlock } =
		context;

	// Inspect bounding boxes.
	const editorActiveLineRect = editorActiveLine.getBoundingClientRect();
	const editorScrollerRect = editorScroller.getBoundingClientRect();

	// Where is the cursor in the editor? Position ∈ [0, 1].
	const cursorPosition =
		(editorActiveLineRect.top - editorScrollerRect.top) /
		editorScrollerRect.height;

	// How many lines does the block span? Position ∈ [0, 1].
	const lineCount = block.end - block.start + 1;
	const blockPosition = (lineNumber - block.start) / lineCount;

	// Inspect the bounding boxes.
	const previewScrollerRect = previewScroller.getBoundingClientRect();
	const previewBlockRect = previewBlock.getBoundingClientRect();

	return (
		previewBlockRect.top -
		previewScrollerRect.top +
		previewScroller.scrollTop +
		previewBlockRect.height * blockPosition -
		previewScrollerRect.height * cursorPosition
	);
}

/**
 *	Gets the scroll position for an empty block.
 */
function getEmptyBlockPosition(
	block: EmptyBlock,
	lineNumber: number,
	context: {
		editorScroller: Element;
		editorActiveLine: Element;
		previewScroller: Element;
		previewBlockPrev: Element;
		previewBlockNext: Element;
	},
): number {
	const {
		editorActiveLine,
		editorScroller,
		previewScroller,
		previewBlockPrev,
		previewBlockNext,
	} = context;

	// Inspect bounding boxes.
	const editorActiveLineRect = editorActiveLine.getBoundingClientRect();
	const editorScrollerRect = editorScroller.getBoundingClientRect();
	const previewScrollerRect = previewScroller.getBoundingClientRect();
	const previewBlockPrevRect = previewBlockPrev.getBoundingClientRect();
	const previewBlockNextRect = previewBlockNext.getBoundingClientRect();

	// Where is the cursor in the editor? Position ∈ [0, 1].
	const cursorPosition =
		(editorActiveLineRect.top - editorScrollerRect.top) /
		editorScrollerRect.height;

	// How many lines does the block span? Position ∈ [0, 1].
	const lineCount = block.end - block.start + 1;
	const blockHeight = previewBlockNextRect.top - previewBlockPrevRect.bottom;
	const blockPosition = (lineNumber - block.start) / lineCount;

	return (
		previewBlockPrevRect.bottom -
		previewScrollerRect.top +
		previewScroller.scrollTop +
		blockHeight * blockPosition -
		previewScrollerRect.height * cursorPosition
	);
}

export { Block, ElementBlock, EmptyBlock, SourceMap, useScrollSyncing };
