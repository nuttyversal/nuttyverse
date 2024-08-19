import { describe, it, expect } from "vitest";
import {
	calculateBlockPosition,
	calculateCursorOffset,
	calculateCursorPosition,
	calculateElementBlockScrollY,
	calculateEmptyBlockScrollY,
	calculateScrollAdjustment,
} from "./calc";
import { Block } from "./types";

describe("Editor scroll syncing calculations", () => {
	it("should calculate the cursor position correctly", () => {
		// Arrange.
		const scroller = {
			getBoundingClientRect: () => {
				return DOMRect.fromRect({
					x: 0,
					y: 0,
					width: 100,
					height: 100,
				});
			},
		};

		const activeLine = {
			getBoundingClientRect: () => {
				return DOMRect.fromRect({
					x: 0,
					y: 50,
					width: 100,
					height: 20,
				});
			},
		};

		// Act.
		const result = calculateCursorPosition({ scroller, activeLine });

		// Assert.
		expect(result).toBe(0.5);
	});

	it("should calculate the cursor offset correctly", () => {
		// Arrange.
		const previewScroller = {
			getBoundingClientRect: () => {
				return DOMRect.fromRect({
					x: 0,
					y: 0,
					width: 100,
					height: 100,
				});
			},
		};

		// Act.
		const result = calculateCursorOffset({
			cursorPosition: 0.5,
			previewScroller,
		});

		// Assert.
		expect(result).toBe(50);
	});

	it("should calculate the block position correctly", () => {
		// Arrange.
		const block: Block = {
			type: "element",
			start: 1,
			end: 5,
			selector: ".test-block",
		};

		// Act.
		const results = {
			start: calculateBlockPosition({ block, lineNumber: 1 }),
			middle: calculateBlockPosition({ block, lineNumber: 3 }),
			end: calculateBlockPosition({ block, lineNumber: 5 }),
		};

		// Assert.
		expect(results.start).toBe(0);
		expect(results.middle).toBe(0.4);
		expect(results.end).toBe(0.8);
	});

	it("should calculate the element block scroll position correctly", () => {
		// Arrange.
		const previewScroller = {
			getBoundingClientRect: () => {
				return DOMRect.fromRect({
					x: 0,
					y: 0,
					width: 100,
					height: 100,
				});
			},
			scrollTop: 20,
		};

		const elementBlock = {
			getBoundingClientRect: () => {
				return DOMRect.fromRect({
					x: 0,
					y: 0,
					width: 100,
					height: 20,
				});
			},
		};

		const block: Block = {
			type: "element",
			start: 1,
			end: 5,
			selector: ".test-block",
		};

		// Act.
		const results = {
			start: calculateElementBlockScrollY({
				block,
				lineNumber: 1,
				previewScroller,
				elementBlock,
			}),
			middle: calculateElementBlockScrollY({
				block,
				lineNumber: 3,
				previewScroller,
				elementBlock,
			}),
			end: calculateElementBlockScrollY({
				block,
				lineNumber: 5,
				previewScroller,
				elementBlock,
			}),
		};

		// Assert.
		expect(results.start).toBe(20);
		expect(results.middle).toBe(28);
		expect(results.end).toBe(36);
	});

	it("should calculate the empty block scroll position correctly", () => {
		// Arrange.
		const previewScroller = {
			getBoundingClientRect: () => {
				return DOMRect.fromRect({
					x: 0,
					y: 0,
					width: 100,
					height: 100,
				});
			},
			scrollTop: 0,
		};

		const prevBlock = {
			getBoundingClientRect: () => {
				return DOMRect.fromRect({
					x: 0,
					y: 0,
					width: 100,
					height: 20,
				});
			},
		};

		const nextBlock = {
			getBoundingClientRect: () => {
				return DOMRect.fromRect({
					x: 0,
					y: 100,
					width: 100,
					height: 20,
				});
			},
		};

		const block: Block = {
			type: "empty",
			start: 5,
			end: 8,
			previous: {
				type: "element",
				start: 1,
				end: 4,
				selector: ".previous-block",
			},
			next: {
				type: "element",
				start: 9,
				end: 12,
				selector: ".next-block",
			},
		};

		// Act.
		const results = {
			start: calculateEmptyBlockScrollY({
				block,
				lineNumber: 5,
				previewScroller,
				prevBlock,
				nextBlock,
			}),
			middle: calculateEmptyBlockScrollY({
				block,
				lineNumber: 6,
				previewScroller,
				prevBlock,
				nextBlock,
			}),
			end: calculateEmptyBlockScrollY({
				block,
				lineNumber: 8,
				previewScroller,
				prevBlock,
				nextBlock,
			}),
		};

		// Assert.
		expect(results.start).toBe(20);
		expect(results.middle).toBe(40);
		expect(results.end).toBe(80);
	});

	it("should adjust the scroll if near the top", () => {
		// Arrange.
		const editorScroller = {
			scrollTop: 10,
			clientHeight: 1000,
			scrollHeight: 10000,
		};

		// Act.
		const adjustedScrollY = calculateScrollAdjustment({
			lineNumber: 1,
			lastLineNumber: 100,
			editorScroller,
			scrollY: 10,
		});

		// Assert.
		expect(adjustedScrollY).toBe(0);
	});

	it("should adjust the scroll if near the bottom", () => {
		// Arrange.
		const editorScroller = {
			scrollTop: 8990,
			clientHeight: 1000,
			scrollHeight: 10000,
		};

		// Act.
		const adjustedScrollY = calculateScrollAdjustment({
			lineNumber: 100,
			lastLineNumber: 100,
			editorScroller,
			scrollY: 9500,
		});

		// Assert.
		expect(adjustedScrollY).toBe(999999);
	});

	it("should not adjust the scroll if not near the top or bottom", () => {
		// Arrange.
		const editorScroller = {
			scrollTop: 500,
			clientHeight: 1000,
			scrollHeight: 10000,
		};

		// Act.
		const adjustedScrollY = calculateScrollAdjustment({
			lineNumber: 50,
			lastLineNumber: 100,
			editorScroller,
			scrollY: 500,
		});

		// Assert.
		expect(adjustedScrollY).toBe(500);
	});
});
