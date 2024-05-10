import { style } from "@vanilla-extract/css";
import { spacing } from "~/index";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: colors.background,
	borderRadius: spacing[1],
	transition: "color 200ms ease-out",
	cursor: "pointer",

	":hover": {
		background: colors.gray.solid["02"],
	},
});

export const link = style({
	display: "flex",
	alignItems: "center",
	width: "100%",
	paddingTop: spacing[2],
	paddingBottom: spacing[2],
	paddingLeft: spacing[2],
	borderRadius: spacing[1],
	letterSpacing: 0,
	transition: "all 200ms ease-out",
	textDecoration: "none",

	":hover": {
		fontVariationSettings: `"opsz" 12, "wdth" 100 !important`,
		fontWeight: "500 !important",
	},
});

export const text = style({
	transition: "all 200ms ease-out",
	":hover": {
		fontVariationSettings: `"opsz" 12, "wdth" 100 !important`,
		fontWeight: "500 !important",
	},
});

export const active = style({
	background: colors.gray.solid["12"],
	color: colors.gray.solid["01"],

	":hover": {
		background: colors.gray.solid["12"],
		color: colors.gray.solid["01"],
	},
});

export const icon = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: spacing[4],
	width: spacing[10],
});

export const external = style({
	color: colors.gray.solid["11"],
	height: spacing[3],
	width: spacing[8],
});
