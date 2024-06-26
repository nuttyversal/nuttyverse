import { style } from "@vanilla-extract/css";
import { colors, spacing } from "@nuttyverse/blocks";

export const body = style({
	backgroundColor: colors.background,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	margin: "auto",
	height: "100dvh",

	"@media": {
		[`screen and (max-width: ${spacing[144]})`]: {
			width: "100%",
		},
	},
});

export const main = style({
	width: "100%",
});
