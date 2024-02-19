import { style } from "@vanilla-extract/css";

export const link = style({
	fontFeatureSettings: "'smcp' on",
	fontVariantCaps: "small-caps",
	textTransform: "lowercase",
	textUnderlineOffset: "3px",
	fontFamily: "Nure",
	textDecoration: "none",
	color: "inherit",

	":hover": {
		textDecoration: "underline",
	},
});
