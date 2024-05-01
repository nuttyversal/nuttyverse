import { style } from "@vanilla-extract/css";
import { spacing } from "~/styles/tokens/spacing";

export const base = style({
	transition: "all 0.2s ease-out",
	cursor: "pointer",
	background: "none",
	border: "none",
	margin: 0,
	padding: 0,

	":active": {
		transform: `translateY(${spacing[2]})`,
	},
});
