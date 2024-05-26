import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	borderColor: colors.gray.solid["12"],
	borderWidth: "3px",
	borderRadius: "3px",
	borderStyle: "solid",
});

export const loadingContainer = style({
	borderColor: colors.gray.solid["11"],
	transition: "all 300ms ease-out",
	opacity: 0.2,
});

export const image = style({
	filter: "none",
	transition: "filter 500ms ease-out",
});

export const withPixelatedRendering = style({
	imageRendering: "pixelated",
});

export const withGaussianBlur = style({
	filter: "blur(16px)",
});
