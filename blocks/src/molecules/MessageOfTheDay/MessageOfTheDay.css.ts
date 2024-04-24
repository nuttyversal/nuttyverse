import {
	createTheme,
	createThemeContract,
	keyframes,
	style,
} from "@vanilla-extract/css";
import * as colors from "~/styles/tokens/colors";
import { spacing } from "~/styles/tokens/spacing";

export const vars = createThemeContract({
	gradient: null,
	dividerColor: null,
	floatKeyFrames: null,
});

export const lightMode = createTheme(vars, {
	gradient: "linear-gradient(180deg, #000 0%, #760063 100%)",
	dividerColor: colors.black,
	floatKeyFrames: keyframes({
		"0%": {
			transform: `translateY(${spacing[0]})`,
		},
		"30%": {
			opacity: 0.8,
		},
		"50%": {
			transform: `translateY(-${spacing[1]})`,
			opacity: 1,
		},
		"70%": {
			opacity: 0.8,
		},
		"100%": {
			transform: `translateY(${spacing[0]})`,
		},
	}),
});

export const darkMode = createTheme(vars, {
	gradient: "linear-gradient(180deg, #fff 0%, #fff 100%)",
	dividerColor: colors.white,
	floatKeyFrames: keyframes({
		"0%": {
			transform: `translateY(${spacing[0]})`,
		},
		"50%": {
			transform: `translateY(-${spacing[1]})`,
		},
		"100%": {
			transform: `translateY(${spacing[0]})`,
		},
	}),
});

export const container = style({
	borderWidth: `${spacing["0.5"]} ${spacing[1]}`,
	borderColor: vars.dividerColor,
	borderStyle: "solid",

	"@media": {
		all: {
			borderRadius: spacing[0],
		},
		[`screen and (min-width: ${spacing[144]})`]: {
			borderRadius: spacing[1],
		},
	},
});

export const text = style({
	lineHeight: spacing[0],
	margin: `${spacing[3.5]} !important`,
	fontFamily: "PragmataPro Liga",
});
