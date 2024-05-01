import { style } from "@vanilla-extract/css";
import { spacing } from "~/index";

export const underConstruction = style({
	fontFamily: "PragmataPro Liga, monospace",
	color: "inherit",
	padding: `${spacing[1]} ${spacing[2]}`,
});
