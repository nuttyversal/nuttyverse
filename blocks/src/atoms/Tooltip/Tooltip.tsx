import { MouseEventHandler, ReactNode, useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
	TooltipContent,
	$activeTooltip,
	hideTooltip,
	showTooltip,
	updateTooltip,
} from "./store";

type TooltipProps = {
	/**
	 * Specifies the target element to trigger the tooltip.
	 */
	children: ReactNode;

	/**
	 * Specifies the tooltip's content.
	 */
	content: TooltipContent;

	/**
	 * Additional classes to apply to the tooltip.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the tooltip.
	 */
	style?: React.CSSProperties;
};

export const Tooltip: React.FC<TooltipProps> = (props) => {
	const activeTooltip = useStore($activeTooltip);

	const handleMouseEnter: MouseEventHandler = () => {
		showTooltip(props.content);
	};

	const handleMouseLeave: MouseEventHandler = () => {
		hideTooltip();
	};

	// Update the tooltip content if the content changes.
	useEffect(() => {
		updateTooltip(props.content);
	}, [props.content]);

	// Hide the tooltip if the component unmounts.
	useEffect(() => {
		return () => {
			if (props.content === activeTooltip) {
				hideTooltip();
			}
		};
	}, []);

	return (
		<div
			className={props.className}
			style={props.style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{props.children}
		</div>
	);
};
