import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const heading = style({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: spacing[2],
	textTransform: "uppercase",
	borderBottom: "2px solid",
	paddingLeft: spacing[4],
	letterSpacing: "0.03rem",
});
