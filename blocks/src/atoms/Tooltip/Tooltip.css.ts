import { style } from "@vanilla-extract/css";

export const tooltip = style({
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 1000,
	pointerEvents: "none",
	transition: "opacity 200ms linear",
	opacity: 1,
});

export const hidden = style({
	opacity: 0,
});
