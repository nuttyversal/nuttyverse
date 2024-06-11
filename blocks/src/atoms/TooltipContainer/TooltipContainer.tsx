import classNames from "classnames";
import { ReactNode } from "react";
import { container } from "./TooltipContainer.css";

type TooltipContainerProps = {
	/**
	 * Specifies the tooltip's content.
	 */
	children: ReactNode;

	/**
	 * Additional class names to apply to the tooltip container.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the tooltip container.
	 */
	style?: React.CSSProperties;
};

export const TooltipContainer = (props: TooltipContainerProps) => {
	const containerClasses = classNames(container, props.className);
	const containerStyles = props.style;

	return (
		<div className={containerClasses} style={containerStyles}>
			{props.children}
		</div>
	);
};
