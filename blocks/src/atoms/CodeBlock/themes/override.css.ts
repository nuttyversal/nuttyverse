import { globalStyle } from "@vanilla-extract/css";
import { experimentalTypeScale } from "~/styles/tokens/typography";

globalStyle("pre > code, pre > code *", {
	fontFamily: "PragmataPro Liga !important",
	fontSize: experimentalTypeScale.smol,
	fontWeight: "bold",
	tabSize: 3,
});
