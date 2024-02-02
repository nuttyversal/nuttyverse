import { style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";

export const container = style({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
});

export const base = style({
	fontSize: "1rem",
	fontWeight: "normal",
	fontStyle: "normal",
	textTransform: "lowercase",
	letterSpacing: "2px",
	border: "2px solid black",
	borderRadius: "4px",
	padding: "0.5rem 2rem",
	cursor: "not-allowed",
	transition: "all 0.2s ease-out",
	color: "white",
	background: "black",
	width: "100%",

	":hover": {
		color: "black",
		background: "white",
		letterSpacing: "2.4px",
		fontVariationSettings: `"opsz" 18, "wdth" 95`,
	},
});

export const banner = recipe({
	base: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "black",
		color: "white",
		borderBottomLeftRadius: "16px",
		borderBottomRightRadius: "16px",
		transition: "all 0.2s ease-out",
		zIndex: -1,
	},
	variants: {
		state: {
			notHovered: {
				opacity: 0,
				transform: "translateY(-100%)",
			},
			hovered: {
				opacity: 1,
				transform: "translateY(0)",
			},
		},
	},
});

export type BannerVariants = RecipeVariants<typeof banner>;
