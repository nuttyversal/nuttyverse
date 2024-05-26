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
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6fd-33ab-77ae-8c0e-91e8ebc4236e/compressed.webp",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6fd-33ab-77ae-8c0e-91e8ebc4236e/preview.webp",
		width: 1008,
		height: 756,
	},
	{
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6fd-02c7-78b0-8289-db5bc16b00e5/compressed.webp",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6fd-02c7-78b0-8289-db5bc16b00e5/preview.webp",
		width: 655,
		height: 561,
	},
	{
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6fc-c98d-792b-9184-b9fea619aa1b/compressed.webp",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6fc-c98d-792b-9184-b9fea619aa1b/preview.webp",
		width: 756,
		height: 1008,
	},
	{
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6fc-97cc-70c5-8d81-8e443f8d1d6a/compressed.webm",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6fc-97cc-70c5-8d81-8e443f8d1d6a/preview.webm",
		width: 1060,
		height: 1412,
	},
	{
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6f9-b2a2-786f-9bc0-c58084d797cb/compressed.webm",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6f9-b2a2-786f-9bc0-c58084d797cb/preview.webm",
		width: 1256,
		height: 1676,
	},
	{
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6fb-fd48-7bbe-b6da-1bafe52d5e12/compressed.webp",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6fb-fd48-7bbe-b6da-1bafe52d5e12/preview.webp",
		width: 756,
		height: 1008,
	},
	{
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6fb-c5d4-7c77-b054-927a7c905629/compressed.webp",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6fb-c5d4-7c77-b054-927a7c905629/preview.webp",
		width: 756,
		height: 1008,
	},
	{
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6fb-7245-7518-937a-7b56e7a18f9f/compressed.webp",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6fb-7245-7518-937a-7b56e7a18f9f/preview.webp",
		width: 1008,
		height: 756,
	},
	{
		compressed_bucket_name: "looking-glass",
		compressed_object_name:
			"018fb6f8-e4dd-72bf-ae05-8d51befa7cd7/compressed.webp",
		preview_bucket_name: "looking-glass",
		preview_object_name: "018fb6f8-e4dd-72bf-ae05-8d51befa7cd7/preview.webp",
		width: 756,
		height: 1008,
	},
];

export const LookingGlass: Story = {
	render: () => {
		const contentBlocks: MasonryContentBlock[] = objects.map((object) => {
			const objectSrc = `https://minio.nuttyver.se/${object.compressed_bucket_name}/${object.compressed_object_name}`;
			const previewSrc = `https://minio.nuttyver.se/${object.preview_bucket_name}/${object.preview_object_name}`;

			return {
				key: object.compressed_object_name,
				content: objectSrc.endsWith(".webp") ? (
					<Image
						src={objectSrc}
						previewSrc={previewSrc}
						height="100%"
						width="100%"
						style={{ objectFit: "cover" }}
						draggable={false}
					/>
				) : (
					<Video
						src={objectSrc}
						previewSrc={previewSrc}
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
