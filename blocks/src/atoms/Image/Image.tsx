import { useContext } from "react";
import classNames from "classnames";
import { NuttyverseContext } from "~/styles/themes/context";
import { base, darkMode, lightMode, withGlow } from "./Image.css";

type ImageProps = {
	glow?: boolean | any;
} & React.ComponentPropsWithoutRef<"img">;

export const Image = (props: ImageProps) => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const { glow, ...htmlImgProps } = props;
	const imageClassNames = classNames(base, themeClass, { [withGlow]: glow });

	return <img className={imageClassNames} {...htmlImgProps} />;
};
