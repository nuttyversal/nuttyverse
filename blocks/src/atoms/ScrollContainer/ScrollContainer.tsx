import classNames from "classnames";
import gsap from "gsap";
import {
	CSSProperties,
	ComponentProps,
	MutableRefObject,
	ReactNode,
	forwardRef,
	useEffect,
	useRef,
} from "react";
import {
	container,
	gradientOverlay,
	topGradient,
	bottomGradient,
	gradientContainer,
} from "./ScrollContainer.css";

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
} & ComponentProps<"div">;

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
	(props, ref) => {
		const { className, style, ...rest } = props;

		const containerRef = useRef<HTMLDivElement>(null);
		const topGradientRef = useRef<HTMLDivElement>(null);
		const bottomGradientRef = useRef<HTMLDivElement>(null);

		// Transition the fade gradient overlay based on scroll position.
		const handleScroll = () => {
			const container = containerRef.current;

			if (!container) {
				return;
			}

			const { scrollTop, scrollHeight, clientHeight } = container;

			// Calculate the opacity of the fade gradient overlay.
			const topFadeOpacity = Math.min(scrollTop / 4, 1);
			const bottomFadeOpacity = Math.min(
				(scrollHeight - scrollTop - clientHeight) / 4,
				1,
			);

			// Fade the gradients based on scroll position.
			gsap.to(topGradientRef.current, {
				opacity: topFadeOpacity,
				duration: 0.2,
			});

			gsap.to(bottomGradientRef.current, {
				opacity: bottomFadeOpacity,
				duration: 0.2,
			});
		};

		useEffect(() => {
			const container = containerRef.current;

			if (!container) {
				return;
			}

			// Initialize.
			handleScroll();

			// Handle updates.
			container.addEventListener("scroll", handleScroll);

			// Clean up.
			return () => container.removeEventListener("scroll", handleScroll);
		}, [containerRef.current]);

		return (
			<div className={classNames(gradientContainer, container, className)}>
				<div
					ref={topGradientRef}
					className={classNames(gradientOverlay, topGradient)}
					style={{ opacity: 0 }}
				/>

				<div
					ref={(node) => {
						const mutableContainerRef =
							containerRef as MutableRefObject<HTMLDivElement | null>;

						mutableContainerRef.current = node;

						if (ref) {
							if (typeof ref === "function") {
								ref(node);
							} else {
								ref.current = node;
							}
						}
					}}
					className={classNames([container, className])}
					style={style}
					{...rest}
				>
					{props.children}
				</div>

				<div
					ref={bottomGradientRef}
					className={classNames(gradientOverlay, bottomGradient)}
					style={{ opacity: 0 }}
				/>
			</div>
		);
	},
);
