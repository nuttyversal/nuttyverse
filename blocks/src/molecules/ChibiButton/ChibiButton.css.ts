import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const base = style({
	width: spacing[32],
	transition: "all 0.2s ease-out",
	cursor: "pointer",
	background: "none",
	border: "none",
	margin: 0,
	padding: 0,

	":active": {
		transform: `translateY(${spacing[2]})`,
	},

	"@media": {
		all: {
			opacity: 0,
			width: "0px",
		},
		"screen and (min-width: 500px)": {
			opacity: 1,
			width: spacing[32],
		},
	},
});
