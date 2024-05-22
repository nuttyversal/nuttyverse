import classNames from "classnames";
import { CSSProperties, ReactNode, forwardRef } from "react";
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

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
	(props, ref) => {
		return (
			<div
				ref={ref}
				className={classNames([container, props.className])}
				style={props.style}
			>
				{props.children}
			</div>
		);
	},
);
