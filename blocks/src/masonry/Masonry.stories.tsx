import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "~/atoms/Image";
import { Video } from "~/atoms/Video";
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
		key: Math.random().toString(36).substring(7),
		content: (
			<Image
				src={imageSrc}
				height="100%"
				width="100%"
				style={{ objectFit: "cover" }}
				draggable={false}
			/>
		),
		boundingBox,
		previous: null,
		next: null,
	};
};

export const Debug: Story = {
	render: () => {
		const contentBlocks: MasonryContentBlock[] = Array.from({
			length: 1000,
		}).map(() => generateMasonryContentBlock());

		return (
			<Masonry
				contentBlocks={contentBlocks}
				style={{ height: "90vh" }}
				debug
			/>
		);
	},
};

const objects = [
	{
		bucket_name: "looking-glass",
		object_name: "018fb3a4-d269-7d85-b3d7-ce3c06b44074/compressed.webp",
		height: 4032,
		width: 3024,
	},
	{
		bucket_name: "looking-glass",
		object_name: "018fb3a6-7b41-7b20-aafb-73de38d8830c/compressed.webm",
		height: 1676,
		width: 1256,
	},
	{
		bucket_name: "looking-glass",
		object_name: "018fb3b1-08cb-70f5-b26c-27eeadf3b27b/compressed.webp",
		height: 3024,
		width: 4032,
	},
	{
		bucket_name: "looking-glass",
		object_name: "018fb3b6-371b-75c2-9402-e9c10b8e553b/compressed.webp",
		height: 4032,
		width: 3024,
	},
	{
		bucket_name: "looking-glass",
		object_name: "018fb3b7-b8da-73fc-91f6-fbf4179ad5a3/compressed.webp",
		height: 4032,
		width: 3024,
	},
	{
		bucket_name: "looking-glass",
		object_name: "018fb3b8-f1df-7a63-b8a9-0f4635afbeea/compressed.webm",
		height: 1412,
		width: 1060,
	},
	{
		bucket_name: "looking-glass",
		object_name: "018fb3ba-409a-79bc-a5b5-0b63c92c22a0/compressed.webp",
		height: 4032,
		width: 3024,
	},
	{
		bucket_name: "looking-glass",
		object_name: "018fb3bc-db31-7f84-a877-15f70f3f694c/compressed.webp",
		height: 2247,
		width: 2625,
	},
	{
		bucket_name: "looking-glass",
		object_name: "018fb3bd-f710-713a-b62c-1bcb60d57b23/compressed.webp",
		height: 3024,
		width: 4032,
	},
].reverse();

export const LookingGlass: Story = {
	render: () => {
		const contentBlocks: MasonryContentBlock[] = objects.map((object) => {
			const objectSrc = `https://minio.nuttyver.se/${object.bucket_name}/${object.object_name}`;

			return {
				key: object.object_name,
				content: objectSrc.endsWith(".webp") ? (
					<Image
						src={objectSrc}
						height="100%"
						width="100%"
						style={{ objectFit: "cover" }}
						draggable={false}
					/>
				) : (
					<Video
						src={objectSrc}
						height="100%"
						width="100%"
						style={{ objectFit: "cover" }}
						draggable={false}
						autoPlay={true}
						loop={true}
					/>
				),
				boundingBox: {
					width: object.width,
					height: object.height,
				},
				previous: null,
				next: null,
			};
		});

		return (
			<Masonry contentBlocks={contentBlocks} style={{ height: "90vh" }} />
		);
	},
};
