/**
 * Masonry container max width breakpoints to responsively determine
 * how many columns to render in the masonry.
 */
export const breakpoints: Record<number, number> = {
	500: 1,
	750: 2,
	1000: 3,
	Infinity: 4,
};

/**
 * The amount of space above and below the viewport to render content.
 */
export const scrollBuffer = 500;

/**
 * The amount of space between blocks in the Masonry layout.
 */
export const blockPadding = 12;
