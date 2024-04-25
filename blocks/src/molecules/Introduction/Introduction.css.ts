import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/themes/contract.css";

export const physicalColor = style({
	color: colors.green.solid[11],
});

export const digitalColor = style({
	color: colors.blue.solid[11],
});
