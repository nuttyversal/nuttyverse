import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";
import { experimentalTypeScale } from "~/styles/tokens/typography";

export const inlineCode = style({
	fontFamily: "PragmataPro Mono Liga",
	fontSize: experimentalTypeScale.smol,
	fontWeight: "bold",

	marginLeft: spacing[0.5],
	marginRight: spacing[0.5],
	paddingTop: spacing[0.5],
	paddingBottom: spacing[0.5],
	paddingLeft: spacing[1],
	paddingRight: spacing[1],
	borderRadius: spacing[1],

	// Prevent slicing over line breaks.
	boxDecorationBreak: "clone",
	WebkitBoxDecorationBreak: "clone",

	backgroundColor: colors.gray.solid["11"],
	color: colors.gray.solid["01"],
});
