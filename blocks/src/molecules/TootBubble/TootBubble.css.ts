import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	width: spacing[64],
	height: spacing[40],
});

export const link = style({
	textDecoration: "none",
});
