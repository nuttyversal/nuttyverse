import { createTheme, createThemeContract, style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { colors, typeScale } from "~/styles/themes/constants";

const vars = createThemeContract({
	backgroundColor: null,
	foregroundColor: null,
	glow: {
		boxShadow: null,
	},
});

export const lightMode = createTheme(vars, {
	backgroundColor: colors.black,
	foregroundColor: colors.white,
	glow: {
		boxShadow: "none",
	},
});

export const darkMode = createTheme(vars, {
	backgroundColor: colors.white,
	foregroundColor: colors.black,
	glow: {
		boxShadow: "0 0 8px 4px rgba(255, 255, 255, 0.5)",
	},
});

export const container = style({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
});

export const base = style({
	background: vars.backgroundColor,
	color: vars.foregroundColor,
	cursor: "pointer",
	fontSize: typeScale.base,
	fontWeight: "normal",
	fontStyle: "normal",
	textTransform: "lowercase",
	letterSpacing: "2px",
	borderColor: vars.backgroundColor,
	borderWidth: "2px",
	borderStyle: "solid",
	borderRadius: "3px",
	padding: "4px 0",
	transition: "all 0.2s ease-out",
	width: "100%",
	zIndex: 1,

	":hover": {
		color: vars.backgroundColor,
		background: vars.foregroundColor,
		letterSpacing: "2.4px",
		fontVariationSettings: `"opsz" 18, "wdth" 95`,
	},

	"@media": {
		"screen and (min-width: 500px)": {
			padding: "8px 0",
		},
	},
});

export const bannerVariants = recipe({
	base: {
		background: vars.backgroundColor,
		color: vars.foregroundColor,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderBottomLeftRadius: "16px",
		borderBottomRightRadius: "16px",
		transition: "all 0.2s ease-out",
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

export type BannerVariants = RecipeVariants<typeof bannerVariants>;

export const withGlow = style({
	boxShadow: vars.glow.boxShadow,
});

export const withNotAllowedCursor = style({
	cursor: "not-allowed",
});
