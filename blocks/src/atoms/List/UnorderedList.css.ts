import { globalStyle, style } from "@vanilla-extract/css";

export const unorderedList = style({
	fontFamily: "Nure",
	paddingLeft: "1em",
	listStyleType: "none",
});

globalStyle(`${unorderedList} li::before`, {
	fontFamily: "Nure",
	content: "✦",
	marginRight: "0.5em",
});
