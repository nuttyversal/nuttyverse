import { style } from "@vanilla-extract/css";
import { colors } from "./constants";

export const lightBackground = style({
	backgroundColor: colors.white,
});

export const darkBackground = style({
	backgroundColor: colors.black,
});
