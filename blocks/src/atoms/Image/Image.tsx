import { useContext } from "react";
import classNames from "classnames";
import { NuttyverseContext } from "~/styles/themes/context";
import { base, darkMode, lightMode, withPixelatedRendering } from "./Image.css";

type ImageProps = {
	/**
	 * If enabled (`true`), applies pixelated image rendering. This is useful
	 * for rendering pixel art at increased sizes without blurring.
	 */
	pixelated?: boolean;
} & React.ComponentPropsWithoutRef<"img">;

export const Image = (props: ImageProps) => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const { pixelated, ...htmlImgProps } = props;
	const imageClassNames = classNames(base, themeClass, {
		[withPixelatedRendering]: pixelated,
	});

	return <img className={imageClassNames} {...htmlImgProps} />;
};
