import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	height: "100%",
	width: "100%",
	transition: "all 300ms linear",
});

export const loadingContainer = style({
	borderColor: colors.gray.solid["11"],
	opacity: 0.2,
});

export const image = style({
	borderColor: colors.gray.solid["12"],
	borderWidth: "2px",
	borderRadius: "3px",
	borderStyle: "solid",

	filter: "none",
	transition: "filter 300ms linear",
});

export const withPixelatedRendering = style({
	imageRendering: "pixelated",
});

export const withGaussianBlur = style({
	filter: "blur(16px)",
});
