import { style } from "@vanilla-extract/css";

export const base = style({
	fontSize: "1rem",
	fontWeight: "normal",
	fontStyle: "normal",
	textTransform: "lowercase",
	letterSpacing: "2px",
	border: "2px solid black",
	borderRadius: "4px",
	padding: "0.5rem 2rem",
	cursor: "not-allowed",
	transition: "all 0.2s ease-out",
	color: "white",
	background: "black",
	width: "100%",

	":hover": {
		color: "black",
		background: "white",
		letterSpacing: "2.4px",
		fontVariationSettings: `"opsz" 18, "wdth" 95`,
	},
});
