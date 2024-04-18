import { createTheme, createThemeContract, style } from "@vanilla-extract/css";
import { colors } from "@nuttyverse/blocks";

export const vars = createThemeContract({
	background: null,
});

export const lightMode = createTheme(vars, {
	background: colors.white,
});

export const darkMode = createTheme(vars, {
	background: colors.black,
});

export const body = style({
	backgroundColor: vars.background,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	minHeight: "100vh",
});

export const main = style({
	margin: "auto",
	width: "500px",
	padding: "1em 2em",

	"@media": {
		"screen and (max-width: 500px)": {
			width: "calc(100% - 2em)",
			padding: "0.5em 0",
		},
	},
});
