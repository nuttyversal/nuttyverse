import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";
import { container } from "./ScrollContainer.css";

type ScrollContainerProps = {
	/**
	 * Specifies the text's content.
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

export const ScrollContainer: React.FC<ScrollContainerProps> = (props) => {
	return (
		<div
			className={classNames([container, props.className])}
			style={props.style}
		>
			{props.children}
		</div>
	);
};
