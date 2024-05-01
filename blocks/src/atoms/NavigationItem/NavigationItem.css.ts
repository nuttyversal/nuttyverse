import { style } from "@vanilla-extract/css";
import { spacing } from "~/index";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	display: "flex",
	alignItems: "center",
	background: colors.background,
	borderRadius: spacing[1],
	transition: "all 200ms ease-out",
	cursor: "pointer",

	":hover": {
		background: colors.gray.solid["02"],
	},
});

export const link = style({
	display: "block",
	width: "100%",
	paddingTop: spacing[2],
	paddingBottom: spacing[2],
	paddingLeft: spacing[2],
	borderRadius: spacing[1],
	letterSpacing: 0,
	transition: "all 200ms ease-out",

	":hover": {
		letterSpacing: "1px",
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
	paddingLeft: spacing[2],
	paddingRight: spacing[2],
});

export const external = style({
	color: colors.gray.solid["11"],
});

export const text = style({
	textDecoration: "none",
});
