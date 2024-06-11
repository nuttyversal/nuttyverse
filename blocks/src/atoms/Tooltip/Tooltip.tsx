import classNames from "classnames";
import gsap from "gsap";
import {
	MouseEventHandler,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { hidden, tooltip } from "./Tooltip.css";

type TooltipProps = {
	/**
	 * Specifies the target element to trigger the tooltip.
	 */
	children: ReactNode;

	/**
	 * Specifies the tooltip's content.
	 */
	content: ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = (props) => {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const { x: mouseX, y: mouseY } = useMousePosition();

	const handleMouseEnter: MouseEventHandler = () => {
		setIsVisible(true);
	};

	const handleMouseLeave: MouseEventHandler = () => {
		setIsVisible(false);
	};

	useEffect(() => {
		if (isVisible && tooltipRef.current) {
			// Center the tooltip just above the mouse cursor.
			const { width, height } = tooltipRef.current.getBoundingClientRect();
			const x = mouseX - width / 2;
			const y = mouseY - height + 10;

			// Tween the tooltip to the new position.
			gsap.to(tooltipRef.current, {
				x,
				y,
				ease: "power2.out",
				duration: 0.2,
			});
		}
	}, [mouseX, mouseY]);

	const tooltipClassNames = classNames(tooltip, {
		[hidden]: !isVisible,
	});

	return (
		<div>
			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				{props.children}
			</div>

			<div className={tooltipClassNames} ref={tooltipRef}>
				{props.content}
			</div>
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
