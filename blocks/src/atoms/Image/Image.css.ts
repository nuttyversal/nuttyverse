import { createTheme, createThemeContract, style } from "@vanilla-extract/css";

export const vars = createThemeContract({
	borderColor: null,
});

export const lightMode = createTheme(vars, {
	borderColor: "black",
});

export const darkMode = createTheme(vars, {
	borderColor: "white",
});

export const base = style({
	borderColor: vars.borderColor,
	borderWidth: "3px",
	borderRadius: "3px",
	borderStyle: "solid",
	imageRendering: "pixelated",
});
