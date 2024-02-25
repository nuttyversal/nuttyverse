import {
	createTheme,
	createThemeContract,
	globalFontFace,
	globalStyle,
	style,
} from "@vanilla-extract/css";
import {
	FontSize,
	narrowTypeScale,
	typeScale,
} from "../../styles/themes/constants";

globalFontFace("Nure", {
	src: [
		'url("https://fonts.nuttyver.se/nure-foo.woff2") format("woff2")',
	].join(", "),
});

globalFontFace("PragmataPro Liga", {
	fontWeight: "normal",
	fontStyle: "normal",
	src: [
		'url("https://fonts.nuttyver.se/pragmatapro-liga-regular-foo.woff2") format("woff2")',
	].join(", "),
});

globalFontFace("PragmataPro Liga", {
	fontWeight: "bold",
	fontStyle: "normal",
	src: [
		'url("https://fonts.nuttyver.se/pragmatapro-liga-bold-foo.woff2") format("woff2")',
	].join(", "),
});

globalFontFace("PragmataPro Liga", {
	fontWeight: "normal",
	fontStyle: "italic",
	src: [
		'url("https://fonts.nuttyver.se/pragmatapro-liga-italic-foo.woff2") format("woff2")',
	].join(", "),
});

globalFontFace("PragmataPro Liga", {
	fontWeight: "bold",
	fontStyle: "italic",
	src: [
		'url("https://fonts.nuttyver.se/pragmatapro-liga-bold-italic-foo.woff2") format("woff2")',
	].join(", "),
});

globalFontFace("PragmataPro Fraktur", {
	fontWeight: "normal",
	src: [
		'url("https://fonts.nuttyver.se/pragmatapro-fraktur-regular-foo.woff2") format("woff2")',
	].join(", "),
});

globalFontFace("PragmataPro Fraktur", {
	fontWeight: "bold",
	src: [
		'url("https://fonts.nuttyver.se/pragmatapro-fraktur-bold-foo.woff2") format("woff2")',
	].join(", "),
});

globalFontFace("FSD Emoji", {
	src: [
		'url("https://fonts.nuttyver.se/fsd-emoji-foo.woff2") format("woff2")',
	].join(", "),
});

globalStyle("*", {
	fontFamily: "FSD Emoji, Nure",
	fontVariationSettings: `"opsz" 18, "wdth" 85`,
	lineHeight: 1.5,
	textRendering: "optimizeLegibility",
	fontFeatureSettings: `'kern' 1`,
	hyphens: "auto",
});

export const vars = createThemeContract({
	color: null,
	gradient: null,
	glow: {
		textShadow: null,
	},
});

export const lightMode = createTheme(vars, {
	color: "black",
	gradient: "linear-gradient(180deg, #000 0%, #760063 100%)",
	glow: {
		textShadow: "none",
	},
});

export const darkMode = createTheme(vars, {
	color: "white",
	gradient: "linear-gradient(180deg, #fff 0%, #fff 100%)",
	glow: {
		textShadow: "0 0 12px rgba(255, 255, 255, 0.5)",
	},
});

export const base = style({
	color: vars.color,
});

export const responsiveFontSize = Object.keys(typeScale).reduce(
	(accumulator, fontSize) => ({
		...accumulator,
		[fontSize]: style({
			vars: {
				fontSize: typeScale[fontSize as keyof typeof typeScale],
			},
			"@media": {
				"screen and (max-width: 600px)": {
					vars: {
						fontSize:
							narrowTypeScale[fontSize as keyof typeof narrowTypeScale],
					},
				},
			},
		}),
	}),
	{} as Record<FontSize, string>,
);

export const withDropCap = style({
	selectors: {
		"&::first-letter": {
			float: "left",
			fontFamily: "PragmataPro Fraktur",
			fontVariantLigatures: "none",
			fontSize: "3em",
			fontWeight: "bold",
			lineHeight: "1em",
			marginRight: 4,
			marginTop: 0,
			color: "transparent",
			background: vars.gradient,
			backgroundClip: "text",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
		},
	},
});

export const withGlow = style({
	textShadow: vars.glow.textShadow,
});
