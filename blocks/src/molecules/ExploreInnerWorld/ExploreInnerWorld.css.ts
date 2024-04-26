import { style } from "@vanilla-extract/css";
import { spacing } from "~/index";

export const underConstruction = style({
	fontFamily: "PragmataPro Liga, monospace",
	color: "inherit",
	padding: `0 ${spacing[4]}`,
	margin: `${spacing[1]} !important`,
});
