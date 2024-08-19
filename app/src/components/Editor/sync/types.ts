/**
 * A block represents a section in the preview that maps to a contiguous
 * range of lines in the source document, which may refer to either an
 * element or an empty space between elements.
 */
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

export { Block, ElementBlock, EmptyBlock, SourceMap };
