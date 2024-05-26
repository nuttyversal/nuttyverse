import classNames from "classnames";
import { useEffect, useState } from "react";
import {
	container,
	loadingContainer,
	video,
	withGaussianBlur,
} from "./Video.css";

type VideoProps = {
	/**
	 * The URL of the video to display.
	 */
	src: string;

	/**
	 * The URL of the video to display as a preview video while the full-sized
	 * video is loading.
	 */
	previewSrc?: string;
} & React.ComponentPropsWithoutRef<"video">;

export const Video = (props: VideoProps) => {
	const { src, previewSrc, ...htmlVideoProps } = props;

	const [videoSrc, setVideoSrc] = useState(previewSrc ? previewSrc : src);

	useEffect(() => {
		if (props.previewSrc) {
			const video = document.createElement("video");
			video.src = props.src;

			video.onloadeddata = () => {
				setVideoSrc(props.src);
			};
		}
	}, []);

	const videoClassNames = classNames(video, {
		[withGaussianBlur]: videoSrc === previewSrc,
	});

	return (
		<div className={videoSrc === previewSrc ? loadingContainer : container}>
			<video
				src={videoSrc}
				className={videoClassNames}
				{...htmlVideoProps}
			/>
		</div>
	);
};
