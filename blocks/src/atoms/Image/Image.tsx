import classNames from "classnames";
import {
	container,
	image,
	withGaussianBlur,
	withPixelatedRendering,
} from "./Image.css";
import { useEffect, useState } from "react";

type ImageProps = {
	/**
	 * The URL of the full-sized image to display.
	 */
	src: string;

	/**
	 * The URL of the image to display as a preview image while the full-sized
	 * image is loading.
	 */
	previewSrc?: string;

	/**
	 * If enabled (`true`), applies pixelated image rendering. This is useful
	 * for rendering pixel art at increased sizes without blurring.
	 */
	pixelated?: boolean;
} & React.ComponentPropsWithoutRef<"img">;

const ImageComponent = (props: ImageProps) => {
	const { src, previewSrc, pixelated, ...htmlImgProps } = props;

	const [imageSrc, setImageSrc] = useState(previewSrc ? previewSrc : src);

	useEffect(() => {
		if (props.previewSrc) {
			const image = new Image();
			image.src = props.src;

			image.onload = () => {
				setImageSrc(props.src);
			};
		}
	}, [src, previewSrc]);

	const imageClassNames = classNames(image, {
		[withPixelatedRendering]: pixelated,
		[withGaussianBlur]: imageSrc === previewSrc,
	});

	return (
		<div className={container}>
			<img src={imageSrc} className={imageClassNames} {...htmlImgProps} />
		</div>
	);
};

export { ImageComponent as Image };
