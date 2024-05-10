import { style } from "@vanilla-extract/css";
import { colors, spacing } from "@nuttyverse/blocks";

export const body = style({
	backgroundColor: colors.background,
	display: "flex",
	margin: "auto",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	height: "100dvh",
	maxHeight: "100dvh",
	overflow: "hidden",
});

export const layout = style({
	display: "grid",
	justifyContent: "center",
	gridTemplateColumns: `${spacing[144]} auto`,
	columnGap: spacing[4],
	rowGap: spacing[2],
	margin: "auto",

	"@media": {
		[`screen and (max-width: 800px)`]: {
			display: "flex",
			flexDirection: "column",
			width: spacing[144],
		},

		[`screen and (max-width: ${spacing[144]})`]: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
		},
	},
});

export const slot = style({
	width: "100%",
});

export const responsiveBubble = style({
	opacity: 1,
	transform: "scale(1)",
	transition: "all 200ms ease-out",

	"@media": {
		[`screen and (max-width: 800px)`]: {
			opacity: 0,
			transform: "scale(0)",
			height: "0px",
			width: "0px",
		},
	},
});

export const responsiveSidebar = style({
	width: "100%",
	opacity: 1,
	transform: "translateX(0px)",
	transition: "all 200ms ease-out",

	"@media": {
		[`screen and (max-width: 800px)`]: {
			opacity: 0,
			height: "0px",
			width: "0px",
			transform: "translateX(20px)",
		},
	},
});
