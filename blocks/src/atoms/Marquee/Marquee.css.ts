import {
	createTheme,
	createThemeContract,
	keyframes,
	style,
} from "@vanilla-extract/css";
import { colors } from "~/index";

const vars = createThemeContract({
	background: null,
	backgroundBefore: null,
	backgroundAfter: null,
});

export const lightMode = createTheme(vars, {
	background: colors.white,
	backgroundBefore: `linear-gradient(to right, ${colors.white}, rgba(255, 255, 255, 0))`,
	backgroundAfter: `linear-gradient(to left, ${colors.white}, rgba(255, 255, 255, 0))`,
});

export const darkMode = createTheme(vars, {
	background: colors.black,
	backgroundBefore: `linear-gradient(to right, ${colors.black}, rgba(0, 0, 0, 0))`,
	backgroundAfter: `linear-gradient(to left, ${colors.black}, rgba(0, 0, 0, 0))`,
});

export const container = style({
	background: vars.background,
	position: "relative",
	display: "flex",
	flexDirection: "row",
	overflow: "hidden",
	zIndex: 10,
});

export const overlay = style({
	position: "absolute",
	width: "100%",
	height: "100%",
	zIndex: 1,
	":before": {
		left: 0,
		top: 0,
		zIndex: 2,
		content: "",
		position: "absolute",
		height: "100%",
		width: "100px",
		background: vars.backgroundBefore,
	},
	":after": {
		right: 0,
		top: 0,
		zIndex: 2,
		content: "",
		position: "absolute",
		height: "100%",
		width: "100px",
		background: vars.backgroundAfter,
	},
});

const scrollKeyframes = keyframes({
	"0%": { transform: "translateX(100%)" },
	"100%": { transform: "translateX(-100%)" },
});

export const marquee = style({
	display: "flex",
	flexShrink: 0,
	justifyContent: "space-around",
	minWidth: "100%",
	width: "100%",
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
	animation: `${scrollKeyframes} 10s linear infinite`,
});

const scrollShadowCloneKeyframes = keyframes({
	"0%": { transform: "translateX(0%)" },
	"100%": { transform: "translateX(-200%)" },
});

export const marqueeShadowClone = style({
	display: "flex",
	flexShrink: 0,
	justifyContent: "space-around",
	minWidth: "100%",
	width: "100%",
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
	animation: `${scrollShadowCloneKeyframes} 10s linear infinite`,
	animationDelay: "5s",
});
