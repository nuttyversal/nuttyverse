import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	width: "100%",
	background: colors.gray.solid["02"],
	borderRadius: spacing[1],
	paddingLeft: spacing[4],
	paddingRight: spacing[4],
});

export const code = style({
	width: "100%",
	paddingTop: spacing[2],
	paddingBottom: spacing[2],
	display: "block",
	overflowX: "auto",
	scrollbarColor: `${colors.gray.solid["12"]} ${colors.gray.solid["02"]}`,
	scrollbarWidth: "thin",
});
