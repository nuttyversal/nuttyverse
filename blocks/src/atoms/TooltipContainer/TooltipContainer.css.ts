import { colors } from "~/styles/themes/contract.css";
import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	background: colors.gray.solid["01"],
	color: colors.gray.solid["12"],

	paddingTop: spacing[1],
	paddingBottom: spacing[1],
	paddingLeft: spacing[2],
	paddingRight: spacing[2],

	borderStyle: "solid",
	borderWidth: spacing["px"],
	borderRadius: spacing[1],
});
