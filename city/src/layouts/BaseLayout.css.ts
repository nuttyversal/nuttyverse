import { style } from "@vanilla-extract/css";
import { colors, spacing } from "@nuttyverse/blocks";

export const body = style({
	backgroundColor: colors.background,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	margin: "auto",
	width: spacing[144],
	height: "100dvh",
	maxHeight: "100dvh",

	"@media": {
		[`screen and (max-width: ${spacing[144]})`]: {
			width: "100%",
		},
	},
});

export const main = style({
	width: "100%",
});

export const container = style({
	marginTop: "1rem",
	marginBottom: "1rem",
	height: "calc(100dvh - 256px)",
	maxHeight: "calc(100dvh - 256px)",
});
