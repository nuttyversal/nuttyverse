import { createTheme, createThemeContract, style } from "@vanilla-extract/css";

const vars = createThemeContract({
	glow: {
		textShadow: null,
	},
});

export const lightMode = createTheme(vars, {
	glow: {
		textShadow: "none",
	},
});

export const darkMode = createTheme(vars, {
	glow: {
		textShadow: "0 0 0.5em rgba(255, 255, 255, 0.5)",
	},
});

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

export const withGlow = style({
	textShadow: vars.glow.textShadow,
});
