import { globalStyle, style } from "@vanilla-extract/css";

export const editorContainer = style({});

globalStyle(`${editorContainer} .cm-editor *`, {
	fontFamily: "PragmataPro Mono Liga !important",
});
