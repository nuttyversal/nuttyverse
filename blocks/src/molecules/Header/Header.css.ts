import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "end",
});

export const header = style({
	margin: "0 !important",
	textTransform: "lowercase",
	letterSpacing: "0.1em",
	lineHeight: "1.2em",
	color: "transparent",
	background: "linear-gradient(180deg, #000 0%, #760063 100%)",
	backgroundClip: "text",
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
});

export const chibi = style({
	width: "140px",
	marginBottom: "-1px",
	zIndex: -1,
});

export const divider = style({
	height: "3px",
	width: "calc(100% + 32px)",
	marginLeft: "-16px",
	background: "black",
	marginBottom: "1.5em",
});
