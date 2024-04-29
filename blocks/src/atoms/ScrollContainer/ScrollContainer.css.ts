import { style } from "@vanilla-extract/css";
import { colors } from "~/index";

export const container = style({
	overflowY: "scroll",
	scrollbarColor: `${colors.gray.solid["12"]} ${colors.gray.solid["01"]}`,
	scrollbarGutter: "stable",
	scrollbarWidth: "thin",
	paddingRight: "0.25rem",
});
