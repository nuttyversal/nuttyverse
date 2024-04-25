import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";

export const background = style({
	fill: colors.gray.solid["01"],
});

export const foreground = style({
	fill: colors.gray.solid["12"],
});
