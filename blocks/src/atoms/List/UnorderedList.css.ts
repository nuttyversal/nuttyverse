import { globalStyle, style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const unorderedList = style({
	fontFamily: "Nure",
	paddingLeft: spacing[0],
	listStyleType: "none",
});

globalStyle(`${unorderedList} li::before`, {
	fontFamily: "Nure",
	content: "✦",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: spacing[8],
	float: "left",
});
