import classNames from "classnames";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
	gradientOverlay,
	topGradient,
	bottomGradient,
	scrollContainer,
	gradientContainer,
} from "./ScrollContainer.css";

type ScrollGradientProps = {
	/**
	 * Specifies the scroll gradient's position.
	 */
	part: "top" | "bottom";
};

export const ScrollGradient: React.FC<ScrollGradientProps> = (props) => {
	const scrollContainerRef = useRef<HTMLElement | null>(null);
	const gradientRef = useRef<HTMLDivElement>(null);

	// Get a reference to the scroll container.
	useEffect(() => {
		const parent = gradientRef.current?.parentElement;

		if (!parent || !parent.classList.contains(gradientContainer)) {
			throw new Error(
				"ScrollGradient must be a child of ScrollGradientContainer.",
			);
		}

		scrollContainerRef.current = parent.querySelector(`.${scrollContainer}`);

		if (!scrollContainerRef.current) {
			throw new Error(
				"ScrollContainer must be a child of ScrollGradientContainer.",
			);
		}
	}, []);

	// Transition the fade gradient overlay based on scroll position.
	const handleScroll = () => {
		const container = scrollContainerRef.current;

		if (!container) {
			return;
		}

		const { scrollTop, scrollHeight, clientHeight } = container;

		// Calculate the opacity of the fade gradient overlay.
		const topDistance = scrollTop;
		const topFadeOpacity = Math.min(topDistance / 4, 1);

		const bottomDistance = scrollHeight - scrollTop - clientHeight;
		const bottomFadeOpacity = Math.min(bottomDistance / 4, 1);

		// Transition the fade gradient overlay.
		gsap.to(gradientRef.current, {
			opacity: props.part === "top" ? topFadeOpacity : bottomFadeOpacity,
			duration: 0.2,
			ease: "none",
		});
	};

	// Register the scroll event listener.
	useEffect(() => {
		const container = scrollContainerRef.current;

		if (!container) {
			return;
		}

		// Initialize.
		handleScroll();

		// Handle updates.
		container.addEventListener("scroll", handleScroll);

		// Clean up.
		return () => container.removeEventListener("scroll", handleScroll);
	}, [scrollContainerRef.current]);

	return (
		<div
			ref={gradientRef}
			className={classNames(
				gradientOverlay,
				props.part === "top" ? topGradient : bottomGradient,
			)}
			style={{ opacity: 0 }}
		/>
	);
};
