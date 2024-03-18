import { useContext } from "react";
import classNames from "classnames";
import { NuttyverseContext } from "~/styles/themes/context";
import {
	base,
	darkMode,
	lightMode,
	withGlow,
	withPixelatedRendering,
} from "./Image.css";

type ImageProps = {
	/**
	 * If enabled (`true`), applies a glow effect to the image in dark mode.
	 */
	glow?: boolean;

	/**
	 * If enabled (`true`), applies pixelated image rendering. This is useful
	 * for rendering pixel art at increased sizes without blurring.
	 */
	pixelated?: boolean;
} & React.ComponentPropsWithoutRef<"img">;

export const Image = (props: ImageProps) => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const { glow, pixelated, ...htmlImgProps } = props;
	const imageClassNames = classNames(base, themeClass, {
		[withGlow]: glow,
		[withPixelatedRendering]: pixelated,
	});

	return <img className={imageClassNames} {...htmlImgProps} />;
};
