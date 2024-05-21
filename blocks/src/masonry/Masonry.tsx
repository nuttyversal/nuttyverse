import classNames from "classnames";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import {
	BoundingBox,
	MasonryLayoutInput,
	MasonryLayoutOutput,
	Position,
	layoutContentBlocks,
} from "./layout";
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
	const [containerWidth, setContainerWidth] = useState(500);

	const [layoutConfig, setLayoutConfig] = useState<MasonryLayoutOutput>({
		contentBlocks: [],
		contentContainerWidth: 0,
		contentContainerHeight: 0,
		columnCount: 0,
		paddingSize: 0,
	});

	useEffect(() => {
		const layoutInput: MasonryLayoutInput = {
			contentBlocks: props.contentBlocks,
			contentContainerWidth: containerWidth,
			columnCount: 4,
			paddingSize: 12,
		};

		const layoutOutput = layoutContentBlocks(layoutInput);
		setLayoutConfig(layoutOutput);
	}, [containerWidth]);

	const containerStyles = {
		...props.style,
		height: `${layoutConfig.contentContainerHeight}px`,
	};

	return (
		<div
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
