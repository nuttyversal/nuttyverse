import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "~/atoms/Image";
import { Masonry } from "./Masonry";
import { BoundingBox, MasonryContentBlock } from "./layout";

const meta: Meta<typeof Masonry> = {
	title: "experimental/Masonry",
	component: Masonry,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Masonry>;

const generateRandomBoundingBox = (): BoundingBox => {
	return {
		width: Math.floor(Math.random() * 20) * 100 + 200,
		height: Math.floor(Math.random() * 20) * 100 + 200,
	};
};

const generateMasonryContentBlock = (): MasonryContentBlock => {
	const boundingBox = generateRandomBoundingBox();
	const dimensions = `${boundingBox.width}x${boundingBox.height}`;
	const imageSrc = `https://placehold.co/${dimensions}`;

	return {
		content: (
			<Image
				src={imageSrc}
				height="100%"
				width="100%"
				style={{ objectFit: "cover" }}
			/>
		),
		boundingBox,
	};
};

const contentBlocks: MasonryContentBlock[] = Array.from({ length: 1000 }).map(
	() => generateMasonryContentBlock(),
);

export const Component: Story = {
	render: () => {
		return <Masonry contentBlocks={contentBlocks} />;
	},
};
