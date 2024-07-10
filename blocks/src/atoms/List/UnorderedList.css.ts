import { globalStyle, style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const unorderedList = style({
	fontFamily: "Nure",
	paddingLeft: spacing[0],
	listStyleType: "none",
	marginTop: "1em",
	marginBottom: "1em",
});

globalStyle(`${unorderedList} li::before`, {
	fontFamily: "Nure",
	content: "✦",
	marginRight: spacing[2],
});
