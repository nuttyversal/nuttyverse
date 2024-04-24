import { createTheme, createThemeContract } from "@vanilla-extract/css";
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
 * Theme contract that defines locally scoped variable names that is
 * implemented by each color mode (light and dark).
 */
export const colors = createThemeContract({
	background: null,
	gray: {
		solid: colorScaleContract,
		alpha: colorScaleContract,
		p3: {
			solid: colorScaleContract,
			alpha: colorScaleContract,
		},
	},
});

/**
 * Defines colors to render when light mode is enabled.
 */
export const lightTheme = createTheme(colors, {
	background: tokens.white,
	gray: {
		solid: tokens.gray.light,
		alpha: tokens.gray.lightAlpha,
		p3: {
			solid: tokens.gray.p3.light,
			alpha: tokens.gray.p3.lightAlpha,
		},
	},
});

/**
 * Defines colors to render when dark mode is enabled.
 */
export const darkTheme = createTheme(colors, {
	background: tokens.black,
	gray: {
		solid: tokens.gray.dark,
		alpha: tokens.gray.darkAlpha,
		p3: {
			solid: tokens.gray.p3.dark,
			alpha: tokens.gray.p3.darkAlpha,
		},
	},
});
