import { createTheme, createThemeContract, style } from "@vanilla-extract/css";
import { colors } from "~/index";

export const vars = createThemeContract({
	borderColor: null,
	glow: {
		boxShadow: null,
	},
});

export const lightMode = createTheme(vars, {
	borderColor: colors.black,
	glow: {
		boxShadow: "none",
	},
});

export const darkMode = createTheme(vars, {
	borderColor: colors.white,
	glow: {
		boxShadow: "0 0 8px 4px rgba(255, 255, 255, 0.5)",
	},
});

export const base = style({
	borderColor: vars.borderColor,
	borderWidth: "3px",
	borderRadius: "3px",
	borderStyle: "solid",
});

export const withGlow = style({
	boxShadow: vars.glow.boxShadow,
});

export const withPixelatedRendering = style({
	imageRendering: "pixelated",
});
