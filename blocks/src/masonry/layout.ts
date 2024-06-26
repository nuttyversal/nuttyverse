import { ReactNode } from "react";
import { content } from "~/atoms/TootContent/TootContent.css";

/**
 * Represents bounding box dimensions.
 */
export type BoundingBox = {
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
 * A utility type that can be intersected with [[MasonryContentBlock]] to
 * extend its definition to include information about position.
 */
export type WithPosition = {
	position: Position;
};

export type MasonryContentBlock<Mixin = {}> = {
	/**
	 * A unique key to identify the content block.
	 */
	key: string;

	masonry: {
		/**
		 * The element to render as a content block in the masonry.
		 */
		content: ReactNode;

		/**
		 * The (static) dimensions of the content block.
		 */
		boundingBox: BoundingBox;
	};

	lightbox: {
		/**
		 * The element to render in the lightbox when the content block is clicked.
		 */
		content: ReactNode;

		/**
		 * The (static) dimensions of the lightbox content.
		 */
		boundingBox: BoundingBox;
	};

	/**
	 * The content block that precedes this one in the list of content blocks.
	 */
	previous: (MasonryContentBlock<Mixin> & Mixin) | null;

	/**
	 * The content block that follows this one in the list of content blocks.
	 */
	next: (MasonryContentBlock<Mixin> & Mixin) | null;
};

/**
 * The input configuration for the Masonry algorithm.
 */
export type MasonryLayoutInput = {
	/**
	 * An ordered list of content blocks to be rendered.
	 */
	contentBlocks: MasonryContentBlock[];

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
	contentBlocks: (MasonryContentBlock & WithPosition)[];

	/**
	 * A map of content block keys to their respective content blocks annotated
	 * with their relative positions within the Masonry layout.
	 */
	contentBlockMap: Map<
		string,
		MasonryContentBlock<WithPosition> & WithPosition
	>;

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
	// Keep track of the y-end for each column. The content blocks are laid out
	// in an imperative fashion. A cursor is updated whenever a new content
	// block is inserted into the cursor's column.
	const columnCursors = Array.from({ length: input.columnCount }).map(() => 0);

	// Compute the width of the Masonry content container without padding.
	const totalPaddingX = (input.columnCount - 1) * input.paddingSize;
	const usableContainerWidth = input.contentContainerWidth - totalPaddingX;
	const singleColumnWidth = usableContainerWidth / input.columnCount;

	// As the content blocks get laid out, they will have their relative
	// positions within the Masonry content container annotated.
	const annotatedContentBlocks: (MasonryContentBlock<WithPosition> &
		WithPosition)[] = [];

	const contentBlockMap = new Map<
		string,
		MasonryContentBlock<WithPosition> & WithPosition
	>();

	for (const contentBlock of input.contentBlocks) {
		// Figure out which column to insert the next content block into.
		let columnIndex: number = -1;
		let lowestCursorPosition = Infinity;

		for (let index = 0; index < columnCursors.length; index++) {
			if (columnCursors[index] < lowestCursorPosition) {
				lowestCursorPosition = columnCursors[index];
				columnIndex = index;
			}
		}

		// Scale the content block to match the column width.
		const resizedBoundingBox: BoundingBox = {
			width: singleColumnWidth,
			height:
				(singleColumnWidth / contentBlock.masonry.boundingBox.width) *
				contentBlock.masonry.boundingBox.height,
		};

		// Annotate the position of the next content block.
		const annotatedContentBlock: MasonryContentBlock<WithPosition> &
			WithPosition = {
			key: contentBlock.key,
			masonry: {
				content: contentBlock.masonry.content,
				boundingBox: resizedBoundingBox,
			},
			lightbox: {
				content: contentBlock.lightbox.content,
				boundingBox: contentBlock.lightbox.boundingBox,
			},
			position: {
				x:
					columnIndex * singleColumnWidth +
					columnIndex * input.paddingSize,
				y: lowestCursorPosition,
			},
			previous: null,
			next: null,
		};

		// Link the content block with the previous one.
		if (annotatedContentBlocks.length > 0) {
			const previousContentBlock =
				annotatedContentBlocks[annotatedContentBlocks.length - 1];
			annotatedContentBlock.previous = previousContentBlock;
			previousContentBlock.next = annotatedContentBlock;
		}

		annotatedContentBlocks.push(annotatedContentBlock);
		contentBlockMap.set(contentBlock.key, annotatedContentBlock);

		// Update the column cursor position.
		columnCursors[columnIndex] +=
			resizedBoundingBox.height + input.paddingSize;
	}

	// Compute the total content container height.
	const computedContainerHeight =
		Math.max(...columnCursors) - input.paddingSize;

	return {
		contentBlocks: annotatedContentBlocks,
		contentBlockMap,
		contentContainerWidth: input.contentContainerWidth,
		contentContainerHeight: computedContainerHeight,
		columnCount: input.columnCount,
		paddingSize: input.paddingSize,
	};
}
