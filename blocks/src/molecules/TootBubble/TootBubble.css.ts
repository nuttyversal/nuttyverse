import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	width: spacing[48],
	height: spacing[36],

	// Tiny nudge to align the marquee with the toot bubble.
	transform: "translateY(10px)",
});

export const link = style({
	textDecoration: "none",
});
