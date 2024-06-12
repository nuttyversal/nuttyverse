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
	overflowY: "auto",
	scrollbarColor: `${colors.gray.solid["01"]} ${colors.gray.solid["12"]}`,
	scrollbarGutter: "stable",
	scrollbarWidth: "thin",
	marginBottom: spacing[1],
});

globalStyle(`${content} *`, {
	fontSize: `${experimentalTypeScale.smol} !important`,
});

globalStyle(`${content} a`, {
	fontFeatureSettings: `"smcp" 1, "c2sc" 1`,
	fontVariant: "all-small-caps",
	fontVariantCaps: "all-small-caps",
	textUnderlineOffset: "3px",
	fontFamily: "Nure",
	textDecoration: "none",
	color: colors.blue.solid["05"],
});

export const metadata = style({
	display: "flex",
	alignItems: "center",
	gap: spacing[1],
});

export const timestamp = style({
	color: colors.gray.solid["08"],
});
