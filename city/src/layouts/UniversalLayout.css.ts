import { style } from "@vanilla-extract/css";
import { layout, spacing } from "@nuttyverse/blocks";

export const main = style({
	width: "100%",
	height: `calc(100dvh - ${layout.headerHeight.wide} - ${layout.footerHeight.wide})`,
	maxHeight: `calc(100dvh - ${layout.headerHeight.wide} - ${layout.footerHeight.wide})`,
	marginBottom: spacing[2],

	"@media": {
		[`screen and (max-width: ${spacing[144]})`]: {
			height: `calc(100dvh - ${layout.headerHeight.narrow} - ${layout.footerHeight.narrow})`,
			maxHeight: `calc(100dvh - ${layout.headerHeight.narrow} - ${layout.footerHeight.narrow})`,
		},
	},
});
