/**
 * Represents an element being rendered in a Masonry layout.
 */
export type ContentBlock = {
	width: number;
	height: number;
};

/**
 * Represents a coordinate position.
 */
export type Position = {
	x: number;
	y: number;
};

/**
 * The input configuration for the Masonry algorithm.
 */
export type MasonryLayoutInput = {
	/**
	 * An ordered list of elements to be rendered.
	 */
	contentBlocks: ContentBlock[];

	/**
	 * The width of the content container.
	 */
	contentContainerWidth: number;

	/**
	 * The number of columns to render.
	 */
	columnCount: number;

	/**
	 * The padding between elements in the Masonry layout.
	 */
	paddingSize: number;
};

/**
 * The output of the Masonry algorithm.
 */
export type MasonryLayoutOutput = {
	/**
	 * An ordered list of elements to be rendered annotated with their relative
	 * positions within the Masonry layout.
	 */
	contentBlocks: (ContentBlock & Position)[];

	/**
	 * The width of the content container.
	 */
	contentContainerWidth: number;

	/**
	 * The computed height of the content container.
	 */
	contentContainerHeight: number;

	/**
	 * The number of columns to render.
	 */
	columnCount: number;

	/**
	 * The padding between elements in the Masonry layout.
	 */
	paddingSize: number;
};

/**
 * Masonry layout algorithm.
 */
export function layoutContentBlocks(
	input: MasonryLayoutInput,
): MasonryLayoutOutput {
	const origin: Position = {
		x: 0,
		y: 0,
	};

	const contentBlocksWithPosition = input.contentBlocks.map((block) => ({
		...block,
		...origin,
	}));

	return {
		contentBlocks: contentBlocksWithPosition,
		contentContainerWidth: input.contentContainerWidth,
		contentContainerHeight: 0,
		columnCount: input.columnCount,
		paddingSize: input.paddingSize,
	};
}
