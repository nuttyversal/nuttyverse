import classNames from "classnames";
import gsap from "gsap";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
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
	const isTooltipVisible = useStore($isTooltipVisible);
	const { x: mouseX, y: mouseY } = useMousePosition();

	// The active tooltip content.
	const activeTooltip = useStore($activeTooltip);

	// The active tooltip component (the content converted into ReactNode).
	const [activeTooltipComponent, setActiveTooltipComponent] =
		useState<ReactNode | null>(null);

	const updateTooltipContent = () => {
		if (activeTooltip) {
			switch (activeTooltip.type) {
				case "text":
					setActiveTooltipComponent(
						<TooltipContainer>
							<Text size="smol" marginless>
								{activeTooltip.content}
							</Text>
						</TooltipContainer>,
					);
					break;
				case "element":
					setActiveTooltipComponent(
						<TooltipContainer>{activeTooltip.element}</TooltipContainer>,
					);
					break;
				default:
					break;
			}
		}
	};

	const updateTooltipPosition = () => {
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
	};

	// Update the tooltip content when it changes.
	useEffect(() => {
		updateTooltipContent();
	}, [activeTooltip]);

	// Update the tooltip position when the mouse moves.
	useLayoutEffect(() => {
		updateTooltipPosition();
	}, [activeTooltipComponent, mouseX, mouseY]);

	// Hide the tooltip when the page changes.
	useEffect(() => {
		const handleNavigation = () => {
			hideTooltip();
		};

		window.addEventListener("popstate", handleNavigation);
		return () => window.removeEventListener("popstate", handleNavigation);
	}, []);

	const tooltipClasses = classNames(tooltip, {
		[hidden]: !isTooltipVisible,
	});

	return (
		<div ref={tooltipRef} className={tooltipClasses}>
			{activeTooltipComponent}
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
