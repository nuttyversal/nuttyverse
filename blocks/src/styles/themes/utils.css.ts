import { style } from "@vanilla-extract/css";
import * as colors from "~/styles/tokens/colors";

export const lightBackground = style({
	backgroundColor: colors.white,
});

export const darkBackground = style({
	backgroundColor: colors.black,
});
