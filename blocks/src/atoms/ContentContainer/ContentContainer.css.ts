import { globalStyle, style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";
import { container as imageContainer } from "~/atoms/Image/Image.css";
import { container as videoContainer } from "~/atoms/Video/Video.css";

export const container = style({
	width: "100%",
});

globalStyle(`${container} > p`, {
	paddingLeft: spacing[4],
	paddingRight: spacing[4],
});

globalStyle(`${container} > blockquote`, {
	marginLeft: spacing[4],
	marginRight: spacing[4],
});

globalStyle(`${container} > ul`, {
	paddingLeft: spacing[4],
	paddingRight: spacing[4],
});

globalStyle(`${container} > ol`, {
	paddingLeft: spacing[4],
	paddingRight: spacing[4],
});

globalStyle(`${container} > ${imageContainer}`, {
	paddingLeft: spacing[2],
	paddingRight: spacing[2],
});

globalStyle(`${container} > ${videoContainer}`, {
	paddingLeft: spacing[2],
	paddingRight: spacing[2],
});
