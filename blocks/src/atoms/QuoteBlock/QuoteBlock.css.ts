import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	borderLeftWidth: spacing[1.5],
	borderLeftColor: colors.gray.solid["10"],
	borderLeftStyle: "solid",
	paddingLeft: spacing[4],
	paddingTop: spacing[2],
	paddingBottom: spacing[2],
});
