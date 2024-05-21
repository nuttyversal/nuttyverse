import classNames from "classnames";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import {
	BoundingBox,
	MasonryLayoutInput,
	MasonryLayoutOutput,
	Position,
	layoutContentBlocks,
} from "./layout";
import { breakpoints } from "./constants";
import { container, contentBlock } from "./Masonry.css";

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
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	const [layoutConfig, setLayoutConfig] = useState<MasonryLayoutOutput>({
		contentBlocks: [],
		contentContainerWidth: 0,
		contentContainerHeight: 0,
		columnCount: 0,
		paddingSize: 0,
	});

	// Observe changes to the width of the masonry container.
	useEffect(() => {
		const handleResize = (entries: ResizeObserverEntry[]) => {
			for (let entry of entries) {
				if (entry.contentBoxSize) {
					setContainerWidth(entry.contentRect.width);
				}
			}
		};

		const observer = new ResizeObserver(handleResize);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, [containerRef.current]);

	// Whenever the masonry container width changes, re-run the layout
	// algorithm to reflow the content blocks.
	useEffect(() => {
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
		setLayoutConfig(layoutOutput);
	}, [containerWidth, props.contentBlocks]);

	const containerStyles = {
		...props.style,
		height: `${layoutConfig.contentContainerHeight}px`,
	};

	return (
		<div
			ref={containerRef}
			className={classNames([container, props.className])}
			style={containerStyles}
		>
			{layoutConfig.contentBlocks.map((block, index) => {
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
