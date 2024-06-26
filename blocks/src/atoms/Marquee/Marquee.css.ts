import { keyframes, style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	background: colors.background,
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
		background: `linear-gradient(to right, ${colors.background}, ${colors.backgroundInvisible})`,
	},
	":after": {
		right: 0,
		top: 0,
		zIndex: 2,
		content: "",
		position: "absolute",
		height: "100%",
		width: "100px",
		background: `linear-gradient(to left, ${colors.background}, ${colors.backgroundInvisible})`,
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
