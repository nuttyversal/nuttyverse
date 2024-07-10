import { globalStyle, style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";

export const editorContainer = style({
	borderWidth: spacing[1],
	borderStyle: "solid",
	borderColor: colors.gray.solid["12"],
	borderRadius: spacing[1],
});

globalStyle(`${editorContainer} .cm-editor *`, {
	fontFamily: "PragmataPro Mono Liga !important",
});
