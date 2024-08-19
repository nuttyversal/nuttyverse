import { Effect } from "effect";
import { Block, ElementBlock, EmptyBlock } from "./types";
import {
	queryCodeMirrorActiveLine,
	queryCodeMirrorScroller,
	queryElementBlock,
	queryEmptyBlock,
	queryPreviewScroller,
} from "./query";

type HasBoundingBox = {
	getBoundingClientRect(): DOMRect;
};

/**
 * Calculates the cursor position relative to the scroller.
 * The cursor position is a value ∈ [0, 1].
 */
const calculateCursorPosition = (context: {
	scroller: HasBoundingBox;
	activeLine: HasBoundingBox;
}) => {
	const { scroller, activeLine } = context;
	const activeLineBox = activeLine.getBoundingClientRect();
	const scrollerBox = scroller.getBoundingClientRect();
	const relativeTop = activeLineBox.top - scrollerBox.top;
	return relativeTop / scrollerBox.height;
};

/**
 * Calculates the offset of the cursor within the scroller.
 * The cursor offset is a value ∈ [0, scroller height].
 */
const calculateCursorOffset = (context: {
	cursorPosition: number;
	previewScroller: HasBoundingBox;
}) => {
	const { cursorPosition, previewScroller } = context;
	const scrollerBox = previewScroller.getBoundingClientRect();
	return cursorPosition * scrollerBox.height;
};

/**
 * Calculates the position of a line within a block by linearly
 * interpolating the line number between the block's start and
 * end positions.
 */
const calculateBlockPosition = (context: {
	block: Block;
	lineNumber: number;
}) => {
	const { block, lineNumber } = context;
	const lineCount = block.end - block.start + 1;
	return (lineNumber - block.start) / lineCount;
};

/**
 * Calculates the scroll position for an element block based on the
 * cursor position and the block's position within the scroller.
 */
const calculateElementBlockScrollY = (context: {
	block: ElementBlock;
	lineNumber: number;
	previewScroller: HasBoundingBox & { scrollTop: number };
	elementBlock: HasBoundingBox;
}) => {
	const { block, lineNumber, previewScroller, elementBlock } = context;

	const scrollerBox = previewScroller.getBoundingClientRect();
	const blockBox = elementBlock.getBoundingClientRect();

	const relativeScrollTop =
		blockBox.top - scrollerBox.top + previewScroller.scrollTop;

	const relativeBlockPosition =
		blockBox.height * calculateBlockPosition({ block, lineNumber });

	return relativeScrollTop + relativeBlockPosition;
};

/**
 * Calculates the scroll position for an empty block based on the
 * cursor position and the block's position within the scroller.
 */
const calculateEmptyBlockScrollY = (context: {
	block: EmptyBlock;
	lineNumber: number;
	previewScroller: HasBoundingBox & { scrollTop: number };
	prevBlock: HasBoundingBox;
	nextBlock: HasBoundingBox;
}) => {
	const { block, lineNumber, previewScroller, prevBlock, nextBlock } = context;

	const scrollerBox = previewScroller.getBoundingClientRect();
	const prevBlockBox = prevBlock.getBoundingClientRect();
	const nextBlockBox = nextBlock.getBoundingClientRect();

	const blockHeight = nextBlockBox.top - prevBlockBox.bottom;

	const relativeScrollTop =
		prevBlockBox.bottom - scrollerBox.top + previewScroller.scrollTop;

	const relativeBlockPosition =
		blockHeight * calculateBlockPosition({ block, lineNumber });

	return relativeScrollTop + relativeBlockPosition;
};

/**
 * Snaps the scroll position to the top or bottom of the scroller
 * if the cursor is within a certain threshold of the top or bottom.
 */
const calculateScrollAdjustment = (context: {
	lineNumber: number;
	lastLineNumber: number;
	scrollY: number;
	editorScroller: {
		scrollTop: number;
		clientHeight: number;
		scrollHeight: number;
	};
}) => {
	const { scrollY, editorScroller, lineNumber, lastLineNumber } = context;

	const scrollTolerance = 20;
	const basicallyInfinity = 999999;

	const isNearTop = editorScroller.scrollTop < scrollTolerance;

	const isNearBottom =
		editorScroller.scrollTop + editorScroller.clientHeight >
		editorScroller.scrollHeight - scrollTolerance;

	if (lineNumber === 1 && isNearTop) {
		return 0;
	}

	if (lineNumber >= lastLineNumber && isNearBottom) {
		return basicallyInfinity;
	}

	return scrollY;
};

/**
 * An effect that queries the cursor position in the editor.
 * The cursor position is a value ∈ [0, 1].
 */
const getCursorPosition = Effect.gen(function* () {
	const scroller = yield* queryCodeMirrorScroller;
	const activeLine = yield* queryCodeMirrorActiveLine;
	return calculateCursorPosition({ scroller, activeLine });
});

/**
 * An effect that queries the scroll position for an element block.
 */
const getElementBlockScrollY = (block: ElementBlock, lineNumber: number) => {
	return Effect.gen(function* () {
		const previewScroller = yield* queryPreviewScroller;
		const elementBlock = yield* queryElementBlock(block);
		const cursorPosition = yield* getCursorPosition;

		const scrollY = calculateElementBlockScrollY({
			block,
			lineNumber,
			previewScroller,
			elementBlock,
		});

		const cursorOffset = calculateCursorOffset({
			cursorPosition,
			previewScroller,
		});

		return scrollY - cursorOffset;
	});
};

/**
 * An effect that queries the scroll position for an empty block.
 */
const getEmptyBlockScrollY = (block: EmptyBlock, lineNumber: number) => {
	return Effect.gen(function* () {
		const previewScroller = yield* queryPreviewScroller;
		const { previous, next } = yield* queryEmptyBlock(block);
		const cursorPosition = yield* getCursorPosition;

		const scrollY = calculateEmptyBlockScrollY({
			block,
			lineNumber,
			previewScroller,
			prevBlock: previous,
			nextBlock: next,
		});

		const cursorOffset = calculateCursorOffset({
			cursorPosition,
			previewScroller,
		});

		return scrollY - cursorOffset;
	});
};

/**
 * An effect that queries the scroll position for a block.
 */
const getBlockScrollY = (block: Block, lineNumber: number) => {
	switch (block.type) {
		case "element": {
			return getElementBlockScrollY(block, lineNumber);
		}
		case "empty": {
			return getEmptyBlockScrollY(block, lineNumber);
		}
	}
};

/**
 * An effect that snaps the scroll position to the top or bottom of the
 * scroller if the cursor is within a certain threshold of the top or bottom.
 */
const snapScrollToEdges = (
	scrollY: number,
	lineNumber: number,
	lastLineNumber: number,
) => {
	return Effect.gen(function* () {
		const editorScroller = yield* queryCodeMirrorScroller;

		return calculateScrollAdjustment({
			scrollY,
			editorScroller,
			lineNumber,
			lastLineNumber,
		});
	});
};

export {
	calculateCursorPosition,
	calculateCursorOffset,
	calculateBlockPosition,
	calculateElementBlockScrollY,
	calculateEmptyBlockScrollY,
	calculateScrollAdjustment,
	getCursorPosition,
	getElementBlockScrollY,
	getEmptyBlockScrollY,
	getBlockScrollY,
	snapScrollToEdges,
};
