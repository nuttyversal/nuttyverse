import { style } from "@vanilla-extract/css";

export const base = style({
	transition: "all 0.1s ease-in-out",
	cursor: "pointer",
	background: "none",
	border: "none",
	margin: 0,
	padding: 0,

	":active": {
		transform: "translateY(0.5em)",
	},
});
