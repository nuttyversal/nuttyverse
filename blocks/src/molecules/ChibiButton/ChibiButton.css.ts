import { style } from "@vanilla-extract/css";

export const base = style({
	width: "125px",
	transition: "all 0.2s ease-out",
	cursor: "pointer",
	background: "none",
	border: "none",
	margin: 0,
	padding: 0,

	":active": {
		transform: "translateY(0.5em)",
	},

	"@media": {
		all: {
			opacity: 0,
			width: "0px",
		},
		"screen and (min-width: 500px)": {
			opacity: 1,
			width: "125px",
		},
	},
});
