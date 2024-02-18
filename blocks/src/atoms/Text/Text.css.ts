import { globalFontFace, globalStyle, style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

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
			background: "linear-gradient(180deg, #000 0%, #760063 100%)",
			backgroundClip: "text",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
		},
	},
});

const typographicProperties = defineProperties({
	properties: {
		// Minor third (6:5)
		fontSize: {
			smol: 13.33,
			body: 16,
			h6: 19.2,
			h5: 23.04,
			h4: 27.648,
			h3: 33.1776,
			h2: 39.81312,
			h1: 47.775744,
		},
	},
});

export const sprinkles = createSprinkles(typographicProperties);

export const text = recipe({
	variants: {
		size: {
			smol: sprinkles({ fontSize: "smol" }),
			body: sprinkles({ fontSize: "body" }),
			h6: sprinkles({ fontSize: "h6" }),
			h5: sprinkles({ fontSize: "h5" }),
			h4: sprinkles({ fontSize: "h4" }),
			h3: sprinkles({ fontSize: "h3" }),
			h2: sprinkles({ fontSize: "h2" }),
			h1: sprinkles({ fontSize: "h1" }),
		},
	},
	defaultVariants: {
		size: "body",
	},
});

export type TextVariants = RecipeVariants<typeof text>;
