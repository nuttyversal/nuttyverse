import { keyframes, style } from "@vanilla-extract/css";

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
});
