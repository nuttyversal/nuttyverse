import { globalStyle, style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";
import { experimentalTypeScale } from "~/styles/tokens/typography";

export const editorContainer = style({
	borderWidth: spacing[1],
	borderStyle: "solid",
	borderRadius: spacing[1],

	// Match the gutter background color.
	borderColor: "#f5f5f5",
});

globalStyle(`${editorContainer} .cm-editor *`, {
	fontFamily: "PragmataPro Mono Liga !important",
	fontSize: experimentalTypeScale["smol"],
});

globalStyle(`${editorContainer} .cm-focused`, {
	outline: "none",
});
