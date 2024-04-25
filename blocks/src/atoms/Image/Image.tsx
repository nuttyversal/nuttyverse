import classNames from "classnames";
import { base, withPixelatedRendering } from "./Image.css";

type ImageProps = {
	/**
	 * If enabled (`true`), applies pixelated image rendering. This is useful
	 * for rendering pixel art at increased sizes without blurring.
	 */
	pixelated?: boolean;
} & React.ComponentPropsWithoutRef<"img">;

export const Image = (props: ImageProps) => {
	const { pixelated, ...htmlImgProps } = props;
	const imageClassNames = classNames(base, {
		[withPixelatedRendering]: pixelated,
	});

	return <img className={imageClassNames} {...htmlImgProps} />;
};
