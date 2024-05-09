import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	width: spacing[64],
	height: spacing[36],
});

export const content = style({
	maxHeight: spacing[20],
});
