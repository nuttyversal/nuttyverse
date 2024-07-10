import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	transition: "all 300ms linear",
});

export const loadingContainer = style({
	borderColor: colors.gray.solid["11"],
	opacity: 0,
});

export const video = style({
	borderColor: colors.gray.solid["12"],
	borderWidth: "2px",
	borderRadius: "3px",
	borderStyle: "solid",

	filter: "none",
	transition: "filter 300ms linear",
});

export const withGaussianBlur = style({
	filter: "blur(16px)",
});
