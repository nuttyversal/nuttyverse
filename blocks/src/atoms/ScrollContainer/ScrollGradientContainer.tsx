import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";
import { gradientContainer } from "./ScrollContainer.css";

type ScrollGradientContainerProps = {
	/**
	 * Specifies the container's content.
	 */
	children: ReactNode;

	/**
	 * Additional class names to apply to the scroll container.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the scroll container.
	 */
	style?: CSSProperties;
};

export const ScrollGradientContainer: React.FC<ScrollGradientContainerProps> = (
	props,
) => {
	return (
		<div
			style={props.style}
			className={classNames(gradientContainer, props.className)}
		>
			{props.children}
		</div>
	);
};
