import { keyframes, style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";

export const contentContainer = style({
	position: "relative",
	width: "100%",
});

const fadeIn = keyframes({
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
});

export const contentBlock = style({
	position: "absolute",
	animation: `${fadeIn} 200ms ease-in`,
	cursor: "pointer",
});

export const backdrop = style({
	animation: `${fadeIn} 200ms ease-in`,
	background: colors.gray.alpha["03"],
	backdropFilter: `blur(${spacing[1]})`,
	position: "absolute",
	top: 0,
	left: 0,
	height: "100%",
	width: "100%",
	overflow: "hidden",
	zIndex: 1000,
});

export const lightboxContainer = style({
	overflow: "auto",
	padding: spacing[16],
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	animation: `${fadeIn} 200ms ease-in`,
	zIndex: 2000,

	"@media": {
		"screen and (max-width: 768px)": {
			padding: spacing[4],
		},
	},
});

export const lightboxContent = style({
	objectFit: "contain",
	margin: "auto",
	height: "auto",
	width: "auto",
	maxWidth: spacing[256],
});
