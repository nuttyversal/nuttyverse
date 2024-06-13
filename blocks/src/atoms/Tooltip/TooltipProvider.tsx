import classNames from "classnames";
import gsap from "gsap";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { Text } from "~/atoms/Text";
import { TooltipContainer } from "~/atoms/TooltipContainer";
import { tooltip, hidden } from "./Tooltip.css";
import { $activeTooltip, $isTooltipVisible, hideTooltip } from "./store";

/**
 * This component should be mounted at the document root to setup. It acts as a
 * singleton provider and uses a nanostore to manage the tooltip state across all
 * instances of the `Tooltip` component.
 */
export const TooltipProvider = () => {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const activeTooltip = useStore($activeTooltip);
	const isTooltipVisible = useStore($isTooltipVisible);
	const { x: mouseX, y: mouseY } = useMousePosition();

	useEffect(() => {
		// Is the tooltip visible?
		const isVisible = activeTooltip !== null;

		if (isVisible && tooltipRef.current) {
			// Center the tooltip just above the mouse cursor.
			const { width, height } = tooltipRef.current.getBoundingClientRect();
			let x = mouseX - width / 2;
			let y = mouseY - height - 8;

			// Adjust x and y relative to parent container.
			const parent = tooltipRef.current.parentElement;

			if (parent) {
				const parentRect = parent.getBoundingClientRect();
				x -= parentRect.left;
				y -= parentRect.top;
			}

			// Tween the tooltip to the new position.
			gsap.to(tooltipRef.current, {
				x,
				y,
				ease: "power2.out",
				duration: 0.2,
			});
		}
	}, [activeTooltip, mouseX, mouseY]);

	// Hide the tooltip when the page changes.
	useEffect(() => {
		const handleNavigation = () => {
			hideTooltip();
		};

		window.addEventListener("popstate", handleNavigation);
		return () => window.removeEventListener("popstate", handleNavigation);
	}, []);

	// Hydrate the tooltip component.
	let tooltipComponent: ReactNode = null;

	if (activeTooltip) {
		switch (activeTooltip.type) {
			case "text":
				tooltipComponent = (
					<TooltipContainer>
						<Text size="smol" marginless>
							{activeTooltip.content}
						</Text>
					</TooltipContainer>
				);
				break;
			case "element":
				tooltipComponent = (
					<TooltipContainer>{activeTooltip.element}</TooltipContainer>
				);
				break;
			default:
				break;
		}
	}

	const tooltipClasses = classNames(tooltip, {
		[hidden]: !isTooltipVisible,
	});

	return (
		<div ref={tooltipRef} className={tooltipClasses}>
			{tooltipComponent}
		</div>
	);
};

/**
 * A hook that returns the current mouse position.
 */
const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: MouseEvent) => {
		setMousePosition({
			x: e.clientX,
			y: e.clientY,
		});
	};

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return mousePosition;
};
