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
	background: colors.pink.solid["09"],
	color: "white",
	cursor: "pointer",
	fontSize: experimentalTypeScale.base,
	fontWeight: "normal",
	fontStyle: "normal",
	textTransform: "lowercase",
	letterSpacing: "1px",
	borderColor: colors.gray.solid["11"],
	borderWidth: "2px",
	borderStyle: "solid",
	borderRadius: spacing[1],
	padding: `${spacing[1]} 0`,
	transition: "all 0.2s ease-out",
	width: "100%",
	zIndex: 1,

	":hover": {
		background: colors.pink.solid["10"],
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
		background: colors.mauve.solid["01"],
		color: colors.mauve.solid["12"],
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderColor: colors.mauve.solid["05"],
		borderWidth: "2px",
		borderTopWidth: 0,
		borderStyle: "solid",
		borderBottomLeftRadius: "8px",
		borderBottomRightRadius: "8px",
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
				marginBottom: spacing[4],
			},
		},
	},
});

export type BannerVariants = RecipeVariants<typeof bannerVariants>;

export const withNotAllowedCursor = style({
	cursor: "not-allowed",
});
