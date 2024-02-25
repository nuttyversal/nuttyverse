import {
	createTheme,
	createThemeContract,
	keyframes,
	style,
} from "@vanilla-extract/css";

export const vars = createThemeContract({
	gradient: null,
	dividerColor: null,
	floatKeyFrames: null,
});

export const lightMode = createTheme(vars, {
	gradient: "linear-gradient(180deg, #000 0%, #760063 100%)",
	dividerColor: "black",
	floatKeyFrames: keyframes({
		"0%": {
			transform: "translateY(0px)",
		},
		"30%": {
			opacity: 0.8,
		},
		"50%": {
			transform: "translateY(-4px)",
			opacity: 1,
		},
		"70%": {
			opacity: 0.8,
		},
		"100%": {
			transform: "translateY(0px)",
		},
	}),
});

export const darkMode = createTheme(vars, {
	gradient: "linear-gradient(180deg, #fff 0%, #fff 100%)",
	dividerColor: "white",
	floatKeyFrames: keyframes({
		"0%": {
			transform: "translateY(0px)",
		},
		"50%": {
			transform: "translateY(-4px)",
		},
		"100%": {
			transform: "translateY(0px)",
		},
	}),
});

export const container = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "end",
	zIndex: -1,
});

export const float = style({
	animationName: vars.floatKeyFrames,
	animationDuration: "3s",
	animationTimingFunction: "ease-in-out",
	animationIterationCount: "infinite",
});

export const header = style({
	display: "inline-block",
	margin: "0 !important",
	marginBottom: "4px !important",
	textTransform: "lowercase",
	letterSpacing: "0.1em",
	lineHeight: "1.2em",
	color: "transparent",
	background: vars.gradient,
	backgroundClip: "text",
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
});

export const chibi = style({
	marginBottom: "-1px",
	transition: "all 0.2s ease-out",

	"@media": {
		all: {
			opacity: 0,
			width: "0px",
		},
		"screen and (min-width: 500px)": {
			opacity: 1,
			width: "125px",
		},
	},
});

export const divider = style({
	height: "2px",
	width: "calc(100% + 32px)",
	marginLeft: "-16px",
	background: vars.dividerColor,
	transition: "all 0.2s ease-out",
});
