import { spacing } from "./spacing";

/**
 * A rough estimation of the header height.
 */
export const headerHeight = {
	wide: spacing[56],
	narrow: spacing[40],
} as const;

/**
 * A rough estimation of the footer height.
 */
export const footerHeight = {
	wide: spacing[8],
	narrow: spacing[6],
} as const;
