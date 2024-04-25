import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	padding: `0 ${spacing[4]}`,
	display: "flex",
	justifyContent: "space-between",
	alignItems: "end",
	zIndex: -1,
});

export const chibi = style({
	marginBottom: "-1px",
	transition: "all 0.2s ease-out",

	"@media": {
		all: {
			opacity: 0,
			width: "0px",
		},
		[`screen and (min-width: ${spacing[144]})`]: {
			opacity: 1,
			width: spacing[32],
		},
	},
});
