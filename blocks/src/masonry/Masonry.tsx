import classNames from "classnames";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { ScrollContainer } from "~/atoms/ScrollContainer";
import {
	BoundingBox,
	MasonryLayoutInput,
	MasonryLayoutOutput,
	Position,
	WithPosition,
	layoutContentBlocks,
} from "./layout";
import { IntervalTree } from "./interval-tree";
import { breakpoints } from "./constants";
import { contentContainer, contentBlock } from "./Masonry.css";

export type MasonryContentBlock = {
	/**
	 * The element to render as a content block in the masonry.
	 */
	content: ReactNode;

	/**
	 * The (static) dimensions of the content block.
	 */
	boundingBox: BoundingBox;
};

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
};

export const Masonry: React.FC<MasonryProps> = (props) => {
	const layoutConfigRef = useRef<MasonryLayoutOutput | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const contentContainerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	const [visibleContentBlocks, setVisibleContentBlocks] = useState<
		(MasonryContentBlock & WithPosition)[]
	>([]);

	// An interval tree to efficiently query for visible content blocks.
	// This tree stores the indices of the content blocks, which are then
	// returned from the window query.
	const intervalTree = useRef(new IntervalTree<number>());

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
			paddingSize: 12,
			columnCount,
		};

		const layoutOutput = layoutContentBlocks(layoutInput);
		layoutConfigRef.current = layoutOutput;

		const tree = new IntervalTree<number>();
		layoutConfigRef.current.contentBlocks.forEach((block, index) => {
			tree.insert(
				{
					low: block.position.y,
					high: block.position.y + block.boundingBox.height,
				},
				index,
			);
		});

		intervalTree.current = tree;
		updateVisibleContentBlocks();
	};

	// Update the visible content blocks whenever the user scrolls the container.
	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.addEventListener(
				"scroll",
				updateVisibleContentBlocks,
			);
		}

		return () => {
			if (scrollContainerRef.current) {
				scrollContainerRef.current.removeEventListener(
					"scroll",
					updateVisibleContentBlocks,
				);
			}
		};
	}, [scrollContainerRef.current]);

	/**
	 * Update the visible content blocks whenever the user scrolls the container.
	 */
	const updateVisibleContentBlocks = () => {
		if (!scrollContainerRef.current || !layoutConfigRef.current) {
			return;
		}

		const scrollBuffer = 200;
		const scrollTop = scrollContainerRef.current.scrollTop;
		const scrollBottom = scrollTop + scrollContainerRef.current.clientHeight;

		const visibleContentBlockIndices = intervalTree.current.query({
			low: scrollTop - scrollBuffer,
			high: scrollBottom + scrollBuffer,
		});

		const visibleContentBlocks = visibleContentBlockIndices
			.map((index) => layoutConfigRef.current?.contentBlocks[index])
			.filter((block): block is MasonryContentBlock & WithPosition => {
				return block != null;
			});

		setVisibleContentBlocks(visibleContentBlocks);
	};

	const containerStyles = {
		...props.style,
		height: layoutConfigRef.current
			? `${layoutConfigRef.current.contentContainerHeight}px`
			: "auto",
	};

	return (
		<ScrollContainer ref={scrollContainerRef} style={{ height: "800px" }}>
			<div
				ref={contentContainerRef}
				className={classNames([contentContainer, props.className])}
				style={containerStyles}
			>
				{visibleContentBlocks.map((block, index) => {
					return (
						<MasonryBlock
							key={index}
							boundingBox={block.boundingBox}
							position={block.position}
						>
							{block.content}
						</MasonryBlock>
					);
				})}
			</div>
		</ScrollContainer>
	);
};

type MasonryBlockProps = {
	/**
	 * The content of the masonry block.
	 */
	children: ReactNode;

	/**
	 * The dimensions of the masonry block.
	 */
	boundingBox: BoundingBox;

	/**
	 * The position of the masonry block.
	 */
	position: Position;
};

const MasonryBlock: React.FC<MasonryBlockProps> = (props) => {
	const blockStyles: CSSProperties = {
		width: props.boundingBox.width,
		height: props.boundingBox.height,
		transform: `translate(${props.position.x}px, ${props.position.y}px)`,
	};

	return (
		<div className={contentBlock} style={blockStyles}>
			{props.children}
		</div>
	);
};
