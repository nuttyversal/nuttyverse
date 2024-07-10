import classNames from "classnames";
import {
	container,
	image,
	loadingContainer,
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

	/**
	 * If enabled (`true`), disables the application of natural margin styles.
	 */
	marginless?: boolean;
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

	// Consistent rem-based margin.
	const margin = "1.2rem 0";

	const containerStyles = {
		margin: props.marginless ? undefined : margin,
	};

	const containerClassNames = classNames(container, {
		[loadingContainer]: imageSrc === previewSrc,
	});

	const imageClassNames = classNames(image, {
		[withPixelatedRendering]: pixelated,
		[withGaussianBlur]: imageSrc === previewSrc,
	});

	return (
		<div className={containerClassNames} style={containerStyles}>
			<img src={imageSrc} className={imageClassNames} {...htmlImgProps} />
		</div>
	);
};

export { ImageComponent as Image };
