import { style } from "@vanilla-extract/css";
import { colors } from "@nuttyverse/blocks";

export const body = style({
	backgroundColor: colors.background,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	minHeight: "100vh",
});

export const main = style({
	margin: "auto",
	width: "36rem",

	"@media": {
		"screen and (max-width: 36rem)": {
			width: "100%",
		},
	},
});
