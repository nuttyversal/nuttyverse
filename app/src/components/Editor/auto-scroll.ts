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
	type: "space";
	start: number;
	end: number;
	previous: ElementBlock;
	next: ElementBlock;
};

/**
 * Maps line numbers in the source document to corresponding DOM locations.
 */
type SourceMap = Record<number, Block>;

function computeScrollY(sourceMap: SourceMap, lineNumber: number): number {
	// Query scroll container.
	const container = document.querySelector(".test-container");

	if (!container) {
		throw new Error("Scroll container not found.");
	}

	const containerBoundingBox = container.getBoundingClientRect();
	const containerHeight = containerBoundingBox.height;
	const containerScrollTop = container.scrollTop;
	const containerTop = containerBoundingBox.top;

	const editorScroller =
		document.querySelector(".cm-scroller")?.getBoundingClientRect().top ?? 0;

	const activeLine =
		document.querySelector(".cm-activeLine")?.getBoundingClientRect().top ??
		0;

	const cursorPosition =
		(activeLine - editorScroller) /
		(document.querySelector(".cm-scroller")?.getBoundingClientRect().height ??
			1);

	console.log({ cursorPosition });

	const block = sourceMap[lineNumber];

	if (!block) {
		return 0;
	}

	if (block.type === "element") {
		const element = document.querySelector(block.selector);

		if (!element) {
			return 0;
		}

		const elementBoundingBox = element.getBoundingClientRect();
		const elementTop =
			elementBoundingBox.top - containerTop + containerScrollTop;
		const elementHeight = elementBoundingBox.height;

		// Interpolate the scroll position.
		const span = block.end - block.start + 1;
		const progress = (lineNumber - block.start) / span;

		// Position target y-coordinate in the middle of the container.
		return (
			elementTop +
			elementHeight * progress -
			containerHeight * cursorPosition
		);
	} else {
		const previousElement = document.querySelector(block.previous.selector);
		const nextElement = document.querySelector(block.next.selector);

		if (!previousElement || !nextElement) {
			return 0;
		}

		const previousRect = previousElement.getBoundingClientRect();
		const nextRect = nextElement.getBoundingClientRect();

		const previousElementBottom =
			previousRect.top +
			previousRect.height -
			containerTop +
			containerScrollTop;

		const nextElementTop = nextRect.top - containerTop + containerScrollTop;

		// Interpolate the scroll position.
		const span = (block.start + block.end) / 2 + 2;
		const progress = (lineNumber - block.start + 1) / span;

		// Position target y-coordinate in the middle of the container.
		return (
			previousElementBottom +
			(nextElementTop - previousElementBottom) * progress -
			containerHeight * cursorPosition
		);
	}
}

export { Block, ElementBlock, EmptyBlock, SourceMap, computeScrollY };
