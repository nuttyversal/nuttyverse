import { Effect } from "effect";
import { ElementNotFoundError } from "./errors";
import { ElementBlock, EmptyBlock } from "./types";

/**
 * An effect that queries the DOM for an element by selector.
 */
const querySelector = (selector: string) => {
	return Effect.try({
		try: () => {
			const element = document.querySelector(selector);

			if (!element) {
				throw new ElementNotFoundError(selector);
			}

			return element;
		},
		catch: () => new ElementNotFoundError(selector),
	});
};

/**
 * An effect that queries the DOM for the element block.
 */
const queryElementBlock = (block: ElementBlock) => {
	return querySelector(block.selector);
};

/**
 * An effect that queries the DOM for an empty block.
 * An empty block implicitly exists between two element blocks.
 */
const queryEmptyBlock = (block: EmptyBlock) => {
	return Effect.gen(function* () {
		const previous = yield* querySelector(block.previous.selector);
		const next = yield* querySelector(block.next.selector);

		return {
			previous,
			next,
		};
	});
};

/**
 * An effect that queries the DOM for the preview scroller.
 */
const queryPreviewScroller = querySelector(".nv-scroller");

/**
 * An effect that queries the DOM for the CodeMirror scroller.
 */
const queryCodeMirrorScroller = querySelector(".cm-scroller");

/**
 * An effect that queries the DOM for the active line in the CodeMirror editor.
 */
const queryCodeMirrorActiveLine = querySelector(".cm-activeLine");

export {
	querySelector,
	queryElementBlock,
	queryEmptyBlock,
	queryPreviewScroller,
	queryCodeMirrorScroller,
	queryCodeMirrorActiveLine,
};
