import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const container = style({
	display: "flex",
	flexDirection: "column",
	gap: spacing[4],
	width: spacing[48],
});
