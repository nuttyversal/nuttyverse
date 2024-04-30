import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	background: colors.gray.solid["02"],
	borderRadius: spacing[1],
	padding: `${spacing[2]} ${spacing[4]}`,
});
