import { globalStyle, style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const orderedList = style({
	fontFamily: "Nure",
	paddingLeft: spacing[4],
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
	width: spacing[8],

	float: "left",
	marginLeft: -spacing[2],
});
