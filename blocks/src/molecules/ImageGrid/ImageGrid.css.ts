import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const grid = style({
	display: "grid",
	gridGap: spacing[1],
	gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
	width: "100%",
});
