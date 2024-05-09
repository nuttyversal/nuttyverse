import { globalStyle, style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";
import { experimentalTypeScale } from "~/styles/tokens/typography";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	display: "flex",
	height: "100%",
	flexDirection: "column",
	justifyContent: "space-between",
});

export const content = style({
	overflowY: "scroll",
	scrollbarColor: `${colors.gray.solid["01"]} ${colors.gray.solid["12"]}`,
	scrollbarGutter: "stable",
	scrollbarWidth: "thin",
	paddingRight: spacing[1],
});

globalStyle(`${content} *`, {
	fontSize: `${experimentalTypeScale.smol} !important`,
});

export const timestamp = style({
	color: colors.gray.solid["08"],
});
