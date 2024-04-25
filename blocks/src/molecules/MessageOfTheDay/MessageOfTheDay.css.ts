import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	borderWidth: `${spacing["0.5"]} ${spacing[1]}`,
	borderColor: colors.gray.solid["12"],
	borderStyle: "solid",

	"@media": {
		all: {
			borderRadius: spacing[0],
		},
		[`screen and (min-width: ${spacing[144]})`]: {
			borderRadius: spacing[1],
		},
	},
});

export const text = style({
	lineHeight: spacing[0],
	margin: `${spacing[3.5]} !important`,
	fontFamily: "PragmataPro Liga",
});
