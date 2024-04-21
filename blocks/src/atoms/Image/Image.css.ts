import { createTheme, createThemeContract, style } from "@vanilla-extract/css";
import * as colors from "~/styles/tokens/colors";

export const vars = createThemeContract({
	borderColor: null,
});

export const lightMode = createTheme(vars, {
	borderColor: colors.black,
});

export const darkMode = createTheme(vars, {
	borderColor: colors.white,
});

export const base = style({
	borderColor: vars.borderColor,
	borderWidth: "3px",
	borderRadius: "3px",
	borderStyle: "solid",
});

export const withPixelatedRendering = style({
	imageRendering: "pixelated",
});
