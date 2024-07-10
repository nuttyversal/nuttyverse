import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";

export const inlineCode = style({
	fontFamily: "PragmataPro Mono Liga",
	marginLeft: spacing[0.5],
	marginRight: spacing[0.5],
	paddingLeft: spacing[1],
	paddingRight: spacing[1],
	borderRadius: spacing[1],
	backgroundColor: colors.gray.solid["11"],
	color: colors.gray.solid["01"],
});
