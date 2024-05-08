import { globalStyle, style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { experimentalTypeScale } from "~/styles/tokens/typography";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	display: "flex",
	flexDirection: "column",
});

export const content = style({
	marginBottom: spacing[2],
});

globalStyle(`${content} *`, {
	fontSize: `${experimentalTypeScale.smol} !important`,
});

export const timestamp = style({
	color: colors.gray.solid["08"],
});
