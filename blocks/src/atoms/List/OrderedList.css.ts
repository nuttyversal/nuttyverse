import { globalStyle, style } from "@vanilla-extract/css";

export const orderedList = style({
	fontFamily: "Nure",
	paddingLeft: "1em",
	listStyleType: "none",
	counterReset: "ordered-list",
});

globalStyle(`${orderedList} li::before`, {
	fontFamily: "Nure",
	fontFeatureSettings: "'ss10' 1",
	content: '"(" counter(ordered-list) ")"',
	counterIncrement: "ordered-list",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "2em",

	float: "left",
	marginLeft: "-0.5em",
});
