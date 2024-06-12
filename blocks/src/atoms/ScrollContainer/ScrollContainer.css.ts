import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	overflowY: "scroll",
	height: "100%",
	scrollbarColor: `${colors.gray.solid["12"]} ${colors.gray.solid["01"]}`,
	scrollbarGutter: "stable",
	scrollbarWidth: "thin",
	paddingRight: "0.25rem",
});

export const gradientOverlay = style({
	position: "absolute",
	left: 0,
	right: 0,
	height: spacing[16],
	pointerEvents: "none",
	zIndex: 1,
});

export const topGradient = style({
	top: 0,
	backgroundImage: `linear-gradient(180deg, ${colors.gray.solid["01"]} 0%, transparent 100%)`,
});

export const bottomGradient = style({
	bottom: 0,
	backgroundImage: `linear-gradient(0deg, ${colors.gray.solid["01"]} 0%, transparent 100%)`,
});
