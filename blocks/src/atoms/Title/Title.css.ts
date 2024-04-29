import { style } from "@vanilla-extract/css";
import { spacing } from "~/index";
import { colors } from "~/styles/themes/contract.css";

export const title = style({
	display: "block",
	background: colors.gray.solid["12"],
	borderRadius: spacing["1"],
	color: colors.gray.solid["01"],
	textTransform: "uppercase",
	letterSpacing: "0.03rem",
	textAlign: "center",
});
