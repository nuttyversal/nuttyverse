import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";

export const base = style({
	borderColor: colors.gray.solid["12"],
	borderWidth: "3px",
	borderRadius: "3px",
	borderStyle: "solid",
});
