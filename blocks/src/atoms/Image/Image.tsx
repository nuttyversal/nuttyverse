import { useContext } from "react";
import { base, darkMode, lightMode, withGlow } from "./Image.css";
import { NuttyverseContext } from "../../styles/themes/Context";

type ImageProps = {
	glow?: boolean | any;
} & React.ComponentPropsWithoutRef<"img">;

export const Image = (props: ImageProps) => {
	const { glow, ...imgProps } = props;
	const theme = useContext(NuttyverseContext);
	const themeClass = theme === "light" ? lightMode : darkMode;
	const classNames = [base, themeClass, glow ? withGlow : undefined];

	return <img className={classNames.join(" ")} {...imgProps} />;
};
