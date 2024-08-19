import { Effect } from "effect";
import { Block, ElementBlock, EmptyBlock } from "./types";
import {
	codeMirrorActiveLine,
	codeMirrorScroller,
	elementBlock,
	emptyBlock,
	previewScroller,
} from "./query";

/**
 * An effect that calculates the cursor position in the editor.
 * The cursor position is a value between `0` and `1`, where `0`
 * is the top of the editor and `1` is the bottom of the editor.
 */
const cursorPosition = Effect.gen(function* () {
	const scroller = yield* codeMirrorScroller;
	const activeLine = yield* codeMirrorActiveLine;

	const scrollerBox = scroller.getBoundingClientRect();
	const activeLineBox = activeLine.getBoundingClientRect();

	return (activeLineBox.top - scrollerBox.top) / scrollerBox.height;
});

/**
 * Calculates the position of a line within a block by linearly
 * interpolating the line number between the block's start and
 * end positions.
 */
const blockPosition = (block: Block, lineNumber: number) => {
	const lineCount = block.end - block.start + 1;
	return (lineNumber - block.start) / lineCount;
};

/**
 * An effect that calculates the scroll position for an element block.
 */
const elementBlockScrollY = (block: ElementBlock, lineNumber: number) => {
	return Effect.gen(function* () {
		const scroller = yield* previewScroller;
		const previewBlock = yield* elementBlock(block);

		const scrollerBox = scroller.getBoundingClientRect();
		const blockBox = previewBlock.getBoundingClientRect();

		return (
			// Calculate relative position of block within scroller.
			blockBox.top -
			scrollerBox.top +
			scroller.scrollTop +
			// Calculate relative position of line within block.
			blockBox.height * blockPosition(block, lineNumber) -
			// Calculate offset to align block with cursor.
			scrollerBox.height * (yield* cursorPosition)
		);
	});
};

/**
 * An effect that calculates the scroll position for an empty block.
 */
const emptyBlockScrollY = (block: EmptyBlock, lineNumber: number) => {
	return Effect.gen(function* () {
		const scroller = yield* previewScroller;
		const { previous, next } = yield* emptyBlock(block);

		const scrollerBox = scroller.getBoundingClientRect();
		const prevBlockBox = previous.getBoundingClientRect();
		const nextBlockBox = next.getBoundingClientRect();

		const blockHeight = nextBlockBox.top - prevBlockBox.bottom;

		return (
			// Calculate relative position of block within scroller.
			prevBlockBox.bottom -
			scrollerBox.top +
			scroller.scrollTop +
			// Calculate relative position of line within block.
			blockHeight * blockPosition(block, lineNumber) -
			// Calculate offset to align block with cursor.
			scrollerBox.height * (yield* cursorPosition)
		);
	});
};

/**
 * An effect that calculates the scroll position for a block.
 */
const blockScrollY = (block: Block, lineNumber: number) => {
	switch (block.type) {
		case "element": {
			return elementBlockScrollY(block, lineNumber);
		}
		case "empty": {
			return emptyBlockScrollY(block, lineNumber);
		}
	}
};

/**
 * Snaps the scroll position to the top or bottom of the scroller
 * if the cursor is within a certain threshold of the top or bottom.
 */
const adjustScrollY = (
	scrollY: number,
	lineNumber: number,
	lastLineNumber: number,
) => {
	return Effect.gen(function* () {
		const scrollTolerance = 20;
		const scroller = yield* codeMirrorScroller;

		const isNearTop = scroller.scrollTop < scrollTolerance;
		const isNearBottom =
			scroller.scrollTop + scroller.clientHeight >
			scroller.scrollHeight - scrollTolerance;

		if (lineNumber === 1 && isNearTop) {
			return 0;
		}

		if (lineNumber >= lastLineNumber && isNearBottom) {
			return 999999;
		}

		return scrollY;
	});
};

export {
	cursorPosition,
	blockPosition,
	elementBlockScrollY,
	emptyBlockScrollY,
	blockScrollY,
	adjustScrollY,
};
