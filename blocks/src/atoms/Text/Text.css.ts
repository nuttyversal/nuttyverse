import {
	createTheme,
	createThemeContract,
	globalFontFace,
	globalStyle,
	style,
} from "@vanilla-extract/css";
import {
	FontSize,
	experimentalTypeScale,
	narrowTypeScale,
	typeScale,
} from "~/styles/tokens/typography";
import * as colors from "~/styles/tokens/colors";
import { spacing } from "~/styles/tokens/spacing";

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
	// Apply fluid typography styles to tween the base font size between
	// 14.4px (0.9rem) and 16px (1rem) when the viewport is in between
	// 320px (20rem) and 960px (60rem). Used a calculator to figure out
	// the clamp parameters.
	//
	// https://royalfig.github.io/fluid-typography-calculator/
	fontSize: "clamp(0.9rem, 0.85rem + 0.25vw, 1rem)",

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
});

export const lightMode = createTheme(vars, {
	color: colors.black,
	gradient: "linear-gradient(180deg, #000 0%, #760063 100%)",
});

export const darkMode = createTheme(vars, {
	color: colors.white,
	gradient: "linear-gradient(180deg, #fff 0%, #fff 100%)",
});

export const base = style({
	color: vars.color,
});

export const responsiveFontSize = Object.keys(typeScale).reduce(
	(accumulator, fontSize) => ({
		...accumulator,
		[fontSize]: style({
			vars: {
				fontSize: experimentalTypeScale[fontSize as keyof typeof typeScale],
			},
			"@media": {
				"screen and (max-width: 600px)": {
					vars: {
						fontSize:
							experimentalTypeScale[
								fontSize as keyof typeof narrowTypeScale
							],
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
			// [HACK] 3em is a value that was picked so that the drop cap would
			// vertically span two lines (1.5em line height * 2), but sometimes,
			// it would span three lines with in certain viewports. I observed
			// that subtracting 1px ensures that this doesn't happen.
			fontSize: "calc(3em - 1px)",

			float: "left",
			fontFamily: "PragmataPro Fraktur",
			fontVariantLigatures: "none",
			fontWeight: "bold",
			lineHeight: "1em",
			marginRight: spacing[1],
			marginTop: 0,
			color: "transparent",
			background: vars.gradient,
			backgroundClip: "text",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
		},
	},
});
