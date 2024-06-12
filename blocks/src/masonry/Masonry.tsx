import { gsap } from "gsap";
import classNames from "classnames";
import { useStore } from "@nanostores/react";
import {
	CSSProperties,
	MouseEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";
import { ScrollContainer } from "~/atoms/ScrollContainer";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";
import {
	MasonryContentBlock,
	MasonryLayoutInput,
	MasonryLayoutOutput,
	WithPosition,
	layoutContentBlocks,
} from "./layout";
import { IntervalTree } from "./interval-tree";
import { blockPadding, breakpoints, scrollBuffer } from "./constants";
import {
	$anchor,
	$scrollToAnchor,
	$isLightboxOpen,
	$preventNextScroll,
	$scrollLock,
	setAnchor,
	clearScrollToAnchor,
	openLightbox,
	closeLightbox,
	setPreventNextScroll,
	clearPreventNextScroll,
	setScrollLock,
	clearScrollLock,
	goNext,
	goPrevious,
} from "./store";
import {
	contentContainer,
	contentBlock,
	backdrop,
	lightboxContainer,
	lightboxContent,
} from "./Masonry.css";

type MasonryProps = {
	/**
	 * List of content blocks to render in a masonry layout.
	 */
	contentBlocks: MasonryContentBlock[];

	/**
	 * Additional class names to apply to the masonry container.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the masonry container.
	 */
	style?: CSSProperties;

	/**
	 * Whether to enable debug mode for the masonry layout.
	 */
	debug?: boolean;
};

export const Masonry: React.FC<MasonryProps> = (props) => {
	const anchor = useStore($anchor);
	const scrollToAnchor = useStore($scrollToAnchor);
	const tween = useRef<gsap.core.Tween | null>(null);
	const layoutConfigRef = useRef<MasonryLayoutOutput | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const contentContainerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	const [visibleContentBlocks, setVisibleContentBlocks] = useState<
		(MasonryContentBlock<WithPosition> & WithPosition)[]
	>([]);

	// An interval tree to efficiently query for visible content blocks.
	// This tree stores the indices of the content blocks, which are then
	// returned from the window query.
	const intervalTree = useRef(new IntervalTree<string>());

	// Observe changes to the width of the masonry container.
	useEffect(() => {
		const handleResize = (entries: ResizeObserverEntry[]) => {
			for (let entry of entries) {
				if (entry.contentBoxSize) {
					setContainerWidth(entry.contentRect.width);
				}
			}
		};

		// Debounce the resize callback function to prevent rapid state updates
		// that could potentially lead to an infinite render loop.
		const debounce = (func: (...args: any[]) => void, wait: number) => {
			let timeout: NodeJS.Timeout;
			return (...args: any[]) => {
				clearTimeout(timeout);
				timeout = setTimeout(() => func(...args), wait);
			};
		};

		// We still want the resizing experience to feel buttery smooth, so
		// we'll limit the debounce delay to 8 ms (120 Hz).
		const observer = new ResizeObserver(debounce(handleResize, 8));

		if (contentContainerRef.current) {
			observer.observe(contentContainerRef.current);
		}

		return () => {
			if (contentContainerRef.current) {
				observer.unobserve(contentContainerRef.current);
			}
		};
	}, [contentContainerRef.current]);

	// Whenever the masonry container width changes, re-run the layout
	// algorithm to reflow the content blocks.
	useEffect(() => computeLayout(), []);
	useEffect(() => computeLayout(), [containerWidth, props.contentBlocks]);

	const computeLayout = () => {
		if (containerWidth === 0) {
			return;
		}

		let columnCount = 0;

		for (const [width, columns] of Object.entries(breakpoints)) {
			const breakpointWidth = parseInt(width, 10);
			if (containerWidth < breakpointWidth) {
				columnCount = columns;
				break;
			}
		}

		const layoutInput: MasonryLayoutInput = {
			contentBlocks: props.contentBlocks,
			contentContainerWidth: containerWidth,
			paddingSize: blockPadding,
			columnCount,
		};

		const layoutOutput = layoutContentBlocks(layoutInput);
		layoutConfigRef.current = layoutOutput;

		const tree = new IntervalTree<string>();
		layoutConfigRef.current.contentBlocks.forEach((block) => {
			tree.insert(
				{
					low: block.position.y,
					high: block.position.y + block.masonryBoundingBox.height,
				},
				block.key,
			);
		});

		intervalTree.current = tree;

		// Re-center the anchor block in the scroll container.
		const anchorKey = $anchor.get()?.key;
		let anchorBlock = null;

		if (anchorKey) {
			anchorBlock = layoutConfigRef.current.contentBlockMap.get(anchorKey);

			// Re-set anchor to update linked list pointers.
			setAnchor(anchorBlock ?? null);
		}

		if (scrollContainerRef.current && anchorBlock) {
			// Prevent the scroll event from triggering an update to the anchor
			// block when we reposition the scroll container.
			setPreventNextScroll();

			scrollContainerRef.current.scrollTop =
				anchorBlock.position.y +
				0.5 * anchorBlock.masonryBoundingBox.height -
				0.5 * scrollContainerRef.current.clientHeight;
		}

		updateVisibleContentBlocks();
	};

	// Update the visible content blocks whenever the user scrolls the container.
	useEffect(() => {
		const handleScroll = () => {
			if (
				$preventNextScroll.get() ||
				$scrollLock.get() ||
				tween.current !== null
			) {
				clearPreventNextScroll();
				return;
			}

			updateVisibleContentBlocks({ updateAnchor: true });
		};

		if (scrollContainerRef.current) {
			scrollContainerRef.current.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (scrollContainerRef.current) {
				scrollContainerRef.current.removeEventListener(
					"scroll",
					handleScroll,
				);
			}
		};
	}, [scrollContainerRef.current]);

	// Scroll to the anchor block when it updates.
	useEffect(() => {
		if (scrollContainerRef.current && anchor && scrollToAnchor) {
			clearScrollToAnchor();
			setScrollLock();

			if (tween.current) {
				tween.current.kill();
			}

			tween.current = gsap.to(scrollContainerRef.current, {
				scrollTop:
					anchor.position.y +
					0.5 * anchor.masonryBoundingBox.height -
					0.5 * scrollContainerRef.current.clientHeight,
				duration: 0.5,
			});

			tween.current.eventCallback("onUpdate", () => {
				updateVisibleContentBlocks();
			});

			tween.current.eventCallback("onComplete", () => {
				clearScrollLock();
				tween.current = null;
			});
		}
	}, [anchor]);

	/**
	 * Update the visible content blocks whenever the user scrolls the container.
	 */
	const updateVisibleContentBlocks = ({
		updateAnchor,
	}: {
		updateAnchor?: boolean;
	} = {}) => {
		if (!scrollContainerRef.current || !layoutConfigRef.current) {
			return;
		}

		const scrollTop = scrollContainerRef.current.scrollTop;
		const scrollBottom = scrollTop + scrollContainerRef.current.clientHeight;

		const visibleContentBlockKeys = intervalTree.current.query({
			low: scrollTop - scrollBuffer,
			high: scrollBottom + scrollBuffer,
		});

		const visibleContentBlocks = visibleContentBlockKeys
			.map((key) => layoutConfigRef.current?.contentBlockMap.get(key))
			.filter(
				(
					block,
				): block is MasonryContentBlock<WithPosition> & WithPosition => {
					return block != null;
				},
			);

		setVisibleContentBlocks(visibleContentBlocks);

		if (updateAnchor) {
			updateAnchorIndex(visibleContentBlocks);
		}
	};

	/**
	 * Update the anchor index to a content block that intersects the middle of
	 * the scroll container viewport.
	 */
	const updateAnchorIndex = (
		visibleContentBlocks: (MasonryContentBlock & WithPosition)[],
	) => {
		if (!scrollContainerRef.current || !layoutConfigRef.current) {
			return 0;
		}

		const scrollCenter =
			scrollContainerRef.current.scrollTop +
			0.5 * scrollContainerRef.current.clientHeight;

		// Find the visible content block that is closest to the center of the
		// scroll container viewport.
		let anchorKey = "";
		let minDistance = Infinity;

		for (const block of visibleContentBlocks) {
			const blockCenter =
				block.position.y + 0.5 * block.masonryBoundingBox.height;
			const distance = Math.abs(scrollCenter - blockCenter);

			if (distance < minDistance) {
				anchorKey = block.key;
				minDistance = distance;
			}
		}

		const anchor = layoutConfigRef.current.contentBlockMap.get(anchorKey);
		setAnchor(anchor ?? null);
	};

	const containerStyles = {
		...props.style,
		height: layoutConfigRef.current
			? `${layoutConfigRef.current.contentContainerHeight}px`
			: "auto",
	};

	return (
		<>
			<ScrollContainer
				ref={scrollContainerRef}
				className={props.className}
				style={props.style}
			>
				<div
					ref={contentContainerRef}
					className={contentContainer}
					style={containerStyles}
				>
					{visibleContentBlocks.map((block) => {
						return (
							<MasonryBlock
								key={block.key}
								contentBlock={block}
								anchor={props.debug && block.key === anchor?.key}
							/>
						);
					})}
				</div>
			</ScrollContainer>
		</>
	);
};

type MasonryBlockProps = {
	/**
	 * The content block to render.
	 */
	contentBlock: MasonryContentBlock<WithPosition> & WithPosition;

	/**
	 * Whether the block is the anchor block.
	 */
	anchor?: boolean;
};

const MasonryBlock: React.FC<MasonryBlockProps> = (props) => {
	const blockStyles: CSSProperties = {
		width: props.contentBlock.masonryBoundingBox.width,
		height: props.contentBlock.masonryBoundingBox.height,
		transform: `translate(${props.contentBlock.position.x}px, ${props.contentBlock.position.y}px)`,
		borderWidth: props.anchor ? spacing[2] : spacing[0],
		borderColor: props.anchor ? colors.yellow.solid[10] : undefined,
		borderStyle: props.anchor ? "solid" : undefined,
	};

	const open: MouseEventHandler = (e) => {
		const leftMouseButton = 0;

		if (e.button !== leftMouseButton) {
			return;
		}

		setAnchor(props.contentBlock, true);
		setPreventNextScroll();
		openLightbox();
	};

	return (
		<div className={contentBlock} style={blockStyles} onMouseDown={open}>
			{props.contentBlock.content}
		</div>
	);
};

export const Lightbox: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const isLightboxOpen = useStore($isLightboxOpen);
	const anchor = useStore($anchor);

	// Close the lightbox only when the user clicks outside of the content.
	const closeOnlyOverContainer = (event: React.MouseEvent) => {
		if (event.target === event.currentTarget) {
			closeLightbox();
		}
	};

	// Keyboard navigation for the lightbox.
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "ArrowRight") {
			goNext();
		} else if (event.key === "ArrowLeft") {
			goPrevious();
		} else if (event.key === "Enter") {
			openLightbox();
		} else if (event.key === "Escape") {
			closeLightbox();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Focus the lightbox container when it opens.
	useEffect(() => {
		if (isLightboxOpen && containerRef.current) {
			setTimeout(() => containerRef.current?.focus(), 0);
		}
	}, [isLightboxOpen, anchor]);

	// Force the width of the lightbox container to match the width of the
	// content block so that the preview image stretches to fill it.
	const contentStyles = {
		width: `${anchor?.lightboxBoundingBox.width}px`,
		height: `${anchor?.lightboxBoundingBox.height}px`,
	} as const;

	// Close the lightbox when the page changes.
	useEffect(() => {
		const handleNavigation = () => {
			closeLightbox();
		};

		window.addEventListener("popstate", handleNavigation);
		return () => window.removeEventListener("popstate", handleNavigation);
	}, []);

	return (
		<>
			{isLightboxOpen && anchor && (
				<ScrollContainer
					ref={containerRef}
					className={classNames([lightboxContainer, backdrop])}
					onMouseDown={closeOnlyOverContainer}
					tabIndex={0}
				>
					<div className={lightboxContent} style={contentStyles}>
						{anchor.content}
					</div>
				</ScrollContainer>
			)}
		</>
	);
};
