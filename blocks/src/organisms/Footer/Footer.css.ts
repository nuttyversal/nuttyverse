import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";
import { colors } from "~/styles/themes/contract.css";

export const footer = style({
	display: "flex",
	justifyContent: "center",
	width: "100%",
	background: colors.gray.solid["12"],

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
	color: colors.gray.solid["01"],
	margin: `${spacing[1]} !important`,
});
