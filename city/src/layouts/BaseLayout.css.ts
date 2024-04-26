import { style } from "@vanilla-extract/css";
import { colors, spacing } from "@nuttyverse/blocks";

export const body = style({
	backgroundColor: colors.background,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
});

export const main = style({
	margin: "auto",
	width: spacing[144],

	"@media": {
		[`screen and (max-width: ${spacing[144]})`]: {
			width: "100%",
		},
	},
});
