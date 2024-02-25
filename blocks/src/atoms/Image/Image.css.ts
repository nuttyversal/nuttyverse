import { createTheme, createThemeContract, style } from "@vanilla-extract/css";

export const vars = createThemeContract({
	borderColor: null,
	glow: {
		boxShadow: null,
	},
});

export const lightMode = createTheme(vars, {
	borderColor: "black",
	glow: {
		boxShadow: "none",
	},
});

export const darkMode = createTheme(vars, {
	borderColor: "white",
	glow: {
		boxShadow: "0 0 8px 4px rgba(255, 255, 255, 0.5)",
	},
});

export const base = style({
	borderColor: vars.borderColor,
	borderWidth: "3px",
	borderRadius: "3px",
	borderStyle: "solid",
	imageRendering: "pixelated",
});

export const withGlow = style({
	boxShadow: vars.glow.boxShadow,
});
