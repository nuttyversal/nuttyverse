import { style } from "@vanilla-extract/css";

export const link = style({
	fontFeatureSettings: `"smcp" 1, "c2sc" 1`,
	fontVariant: "all-small-caps",
	fontVariantCaps: "all-small-caps",
	textUnderlineOffset: "3px",
	fontFamily: "Nure",
	textDecoration: "none",
	color: "inherit",

	":hover": {
		textDecoration: "underline",
	},
});
