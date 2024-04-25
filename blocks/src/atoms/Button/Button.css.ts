import { style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { experimentalTypeScale } from "~/styles/tokens/typography";
import { spacing } from "~/styles/tokens/spacing";
import { colors } from "~/styles/themes/contract.css";

export const container = style({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
});

export const base = style({
	background: colors.gray.solid["12"],
	color: colors.gray.solid["01"],
	cursor: "pointer",
	fontSize: experimentalTypeScale.base,
	fontWeight: "normal",
	fontStyle: "normal",
	textTransform: "lowercase",
	letterSpacing: "2px",
	borderColor: colors.gray.solid["12"],
	borderWidth: "2px",
	borderStyle: "solid",
	borderRadius: "3px",
	padding: `${spacing[1]} 0`,
	transition: "all 0.2s ease-out",
	width: "100%",
	zIndex: 1,

	":hover": {
		background: colors.gray.solid["01"],
		color: colors.gray.solid["12"],
		letterSpacing: "2.4px",
		fontVariationSettings: `"opsz" 18, "wdth" 95`,
	},

	"@media": {
		[`screen and (min-width: ${spacing[144]})`]: {
			padding: `${spacing[2]} 0`,
		},
	},
});

export const bannerVariants = recipe({
	base: {
		background: colors.gray.solid["12"],
		color: colors.gray.solid["01"],
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

export const withNotAllowedCursor = style({
	cursor: "not-allowed",
});
