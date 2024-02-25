import { useContext } from "react";
import { base, darkMode, lightMode } from "./Image.css";
import { NuttyverseContext } from "../../styles/themes/Context";

type ImageProps = {} & React.ComponentPropsWithoutRef<"img">;

export const Image = (props: ImageProps) => {
	const theme = useContext(NuttyverseContext);
	const themeClass = theme === "light" ? lightMode : darkMode;

	return <img className={[base, themeClass].join(" ")} {...props} />;
};
