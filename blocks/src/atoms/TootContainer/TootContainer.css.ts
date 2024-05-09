import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	position: "relative",
	background: colors.gray.solid["12"],
	color: colors.gray.solid["01"],
	borderRadius: spacing[1],
	padding: `${spacing[3]} ${spacing[3]}`,
});

export const tailContainer = style({
	position: "absolute",
	top: "50%",
	transform: `translate(-${spacing[8]})`,
});

export const tailPath = style({
	fill: colors.gray.solid["12"],
});
