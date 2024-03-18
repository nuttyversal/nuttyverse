import { useContext } from "react";
import { NuttyverseContext } from "~/styles/themes/context";
import { base, darkMode, lightMode, withGlow } from "./Image.css";

type ImageProps = {
	glow?: boolean | any;
} & React.ComponentPropsWithoutRef<"img">;

export const Image = (props: ImageProps) => {
	const { glow, ...imgProps } = props;
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;
	const classNames = [base, themeClass, glow ? withGlow : undefined];

	return <img className={classNames.join(" ")} {...imgProps} />;
};
