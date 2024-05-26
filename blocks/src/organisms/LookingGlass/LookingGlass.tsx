import { Masonry, MasonryContentBlock } from "~/masonry";
import { Image } from "~/atoms/Image";
import { Video } from "~/atoms/Video";

export const LookingGlass: React.FC = () => {
	// [TODO] Replace with API response.
	const objects = [
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fd-33ab-77ae-8c0e-91e8ebc4236e/compressed.webp",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fd-33ab-77ae-8c0e-91e8ebc4236e/preview.webp",
			width: 1008,
			height: 756,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fd-02c7-78b0-8289-db5bc16b00e5/compressed.webp",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fd-02c7-78b0-8289-db5bc16b00e5/preview.webp",
			width: 655,
			height: 561,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fc-c98d-792b-9184-b9fea619aa1b/compressed.webp",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fc-c98d-792b-9184-b9fea619aa1b/preview.webp",
			width: 756,
			height: 1008,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fc-97cc-70c5-8d81-8e443f8d1d6a/compressed.webm",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fc-97cc-70c5-8d81-8e443f8d1d6a/preview.webm",
			width: 1060,
			height: 1412,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6f9-b2a2-786f-9bc0-c58084d797cb/compressed.webm",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6f9-b2a2-786f-9bc0-c58084d797cb/preview.webm",
			width: 1256,
			height: 1676,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fb-fd48-7bbe-b6da-1bafe52d5e12/compressed.webp",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fb-fd48-7bbe-b6da-1bafe52d5e12/preview.webp",
			width: 756,
			height: 1008,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fb-c5d4-7c77-b054-927a7c905629/compressed.webp",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fb-c5d4-7c77-b054-927a7c905629/preview.webp",
			width: 756,
			height: 1008,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fb-7245-7518-937a-7b56e7a18f9f/compressed.webp",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fb-7245-7518-937a-7b56e7a18f9f/preview.webp",
			width: 1008,
			height: 756,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6f8-e4dd-72bf-ae05-8d51befa7cd7/compressed.webp",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6f8-e4dd-72bf-ae05-8d51befa7cd7/preview.webp",
			width: 756,
			height: 1008,
		},
	];

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

	return <Masonry contentBlocks={contentBlocks} style={{ height: "90vh" }} />;
};
