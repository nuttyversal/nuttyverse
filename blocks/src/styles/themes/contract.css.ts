import { createTheme, createThemeContract } from "@vanilla-extract/css";
import * as radix from "@radix-ui/colors";
import * as tokens from "~/styles/tokens/colors";

/**
 * Every color scale in @radix-ui/colors has 12 steps.
 * https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
 */
const colorScaleContract = {
	"01": null,
	"02": null,
	"03": null,
	"04": null,
	"05": null,
	"06": null,
	"07": null,
	"08": null,
	"09": null,
	"10": null,
	"11": null,
	"12": null,
} as const;

/**
 * Every color palette in @radix-ui/colors has both a solid and alpha
 * variant. For supported displays, P3 color gamut support is available.
 */
const colorPaletteContract = {
	solid: colorScaleContract,
	alpha: colorScaleContract,
	p3: {
		solid: colorScaleContract,
		alpha: colorScaleContract,
	},
} as const;

/**
 * Theme contract that defines locally scoped variable names that is
 * implemented by each color mode (light and dark).
 */
export const colors = createThemeContract({
	background: null,
	backgroundInvisible: null,
	gray: colorPaletteContract,
	mauve: colorPaletteContract,
	slate: colorPaletteContract,
	sage: colorPaletteContract,
	olive: colorPaletteContract,
	sand: colorPaletteContract,
	gold: colorPaletteContract,
	bronze: colorPaletteContract,
	brown: colorPaletteContract,
	yellow: colorPaletteContract,
	amber: colorPaletteContract,
	orange: colorPaletteContract,
	tomato: colorPaletteContract,
	red: colorPaletteContract,
	crimson: colorPaletteContract,
	pink: colorPaletteContract,
	plum: colorPaletteContract,
	purple: colorPaletteContract,
	violet: colorPaletteContract,
	iris: colorPaletteContract,
	indigo: colorPaletteContract,
	blue: colorPaletteContract,
	cyan: colorPaletteContract,
	teal: colorPaletteContract,
	jade: colorPaletteContract,
	green: colorPaletteContract,
	grass: colorPaletteContract,
	lime: colorPaletteContract,
	mint: colorPaletteContract,
	sky: colorPaletteContract,
});

/**
 * A utility function to derive a theme contract implementation for a
 * Radix UI color palette.
 */
const generateColorPalette = (colorName: string, theme: "light" | "dark") => {
	const suffix = theme === "dark" ? "Dark" : "";

	const palette: any = {
		solid: {},
		alpha: {},
		p3: {
			solid: {},
			alpha: {},
		},
	};

	Object.keys(colorScaleContract).forEach((step) => {
		const radixIndex = parseInt(step, 10);
		const radixUntyped = radix as any;

		palette.solid[step] =
			radixUntyped[`${colorName}${suffix}`][`${colorName}${radixIndex}`];

		palette.alpha[step] =
			radixUntyped[`${colorName}${suffix}A`][`${colorName}A${radixIndex}`];

		palette.p3.solid[step] =
			radixUntyped[`${colorName}${suffix}P3`][`${colorName}${radixIndex}`];

		palette.p3.alpha[step] =
			radixUntyped[`${colorName}${suffix}P3A`][`${colorName}A${radixIndex}`];
	});

	return palette;
};

/**
 * Defines colors to render when light mode is enabled.
 */
export const lightTheme = createTheme(colors, {
	background: tokens.white,
	backgroundInvisible: tokens.whiteInvisible,
	gray: {
		solid: tokens.gray.light,
		alpha: tokens.gray.lightAlpha,
		p3: {
			solid: tokens.gray.p3.light,
			alpha: tokens.gray.p3.lightAlpha,
		},
	},
	mauve: generateColorPalette("mauve", "light"),
	slate: generateColorPalette("slate", "light"),
	sage: generateColorPalette("sage", "light"),
	olive: generateColorPalette("olive", "light"),
	sand: generateColorPalette("sand", "light"),
	gold: generateColorPalette("gold", "light"),
	bronze: generateColorPalette("bronze", "light"),
	brown: generateColorPalette("brown", "light"),
	yellow: generateColorPalette("yellow", "light"),
	amber: generateColorPalette("amber", "light"),
	orange: generateColorPalette("orange", "light"),
	tomato: generateColorPalette("tomato", "light"),
	red: generateColorPalette("red", "light"),
	crimson: generateColorPalette("crimson", "light"),
	pink: generateColorPalette("pink", "light"),
	plum: generateColorPalette("plum", "light"),
	purple: generateColorPalette("purple", "light"),
	violet: generateColorPalette("violet", "light"),
	iris: generateColorPalette("iris", "light"),
	indigo: generateColorPalette("indigo", "light"),
	blue: generateColorPalette("blue", "light"),
	cyan: generateColorPalette("cyan", "light"),
	teal: generateColorPalette("teal", "light"),
	jade: generateColorPalette("jade", "light"),
	green: generateColorPalette("green", "light"),
	grass: generateColorPalette("grass", "light"),
	lime: generateColorPalette("lime", "light"),
	mint: generateColorPalette("mint", "light"),
	sky: generateColorPalette("sky", "light"),
});

/**
 * Defines colors to render when dark mode is enabled.
 */
export const darkTheme = createTheme(colors, {
	background: tokens.black,
	backgroundInvisible: tokens.blackInvisible,
	gray: {
		solid: tokens.gray.dark,
		alpha: tokens.gray.darkAlpha,
		p3: {
			solid: tokens.gray.p3.dark,
			alpha: tokens.gray.p3.darkAlpha,
		},
	},
	mauve: generateColorPalette("mauve", "dark"),
	slate: generateColorPalette("slate", "dark"),
	sage: generateColorPalette("sage", "dark"),
	olive: generateColorPalette("olive", "dark"),
	sand: generateColorPalette("sand", "dark"),
	gold: generateColorPalette("gold", "dark"),
	bronze: generateColorPalette("bronze", "dark"),
	brown: generateColorPalette("brown", "dark"),
	yellow: generateColorPalette("yellow", "dark"),
	amber: generateColorPalette("amber", "dark"),
	orange: generateColorPalette("orange", "dark"),
	tomato: generateColorPalette("tomato", "dark"),
	red: generateColorPalette("red", "dark"),
	crimson: generateColorPalette("crimson", "dark"),
	pink: generateColorPalette("pink", "dark"),
	plum: generateColorPalette("plum", "dark"),
	purple: generateColorPalette("purple", "dark"),
	violet: generateColorPalette("violet", "dark"),
	iris: generateColorPalette("iris", "dark"),
	indigo: generateColorPalette("indigo", "dark"),
	blue: generateColorPalette("blue", "dark"),
	cyan: generateColorPalette("cyan", "dark"),
	teal: generateColorPalette("teal", "dark"),
	jade: generateColorPalette("jade", "dark"),
	green: generateColorPalette("green", "dark"),
	grass: generateColorPalette("grass", "dark"),
	lime: generateColorPalette("lime", "dark"),
	mint: generateColorPalette("mint", "dark"),
	sky: generateColorPalette("sky", "dark"),
});
