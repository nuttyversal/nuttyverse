import { style } from "@vanilla-extract/css";

export const link = style({
	fontFeatureSettings: `"smcp" 1, "c2sc" 1`,
	fontVariant: "small-caps",
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
