import { style } from "@vanilla-extract/css";

export const tooltip = style({
	position: "fixed",
	top: 0,
	left: 0,
	zIndex: 10000,
	pointerEvents: "none",
	transition: "opacity 200ms linear",
	opacity: 1,
});

export const hidden = style({
	opacity: 0,
});
