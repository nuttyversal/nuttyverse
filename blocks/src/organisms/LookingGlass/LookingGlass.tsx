import { ReactNode } from "react";
import { Masonry, MasonryContentBlock } from "~/masonry";
import { Image } from "~/atoms/Image";
import { Tooltip } from "~/atoms/Tooltip";
import { Video } from "~/atoms/Video";

export const LookingGlass: React.FC = () => {
	// [TODO] Replace with API response.
	const objects = [
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"0190051f-4e10-72e7-b910-abc430473c16/compressed.webm",
			description: "At a Vampire Weekend concert.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"0190051f-4e10-72e7-b910-abc430473c16/preview.webm",
			height: 767,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"0190053f-b8ee-7e23-aebd-bbe330a920de/compressed.webp",
			description: "Birds of a feather flock together.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"0190053f-b8ee-7e23-aebd-bbe330a920de/preview.webp",
			height: 645,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"0190051e-9ac6-7a56-ae9d-0e310635ea45/compressed.webm",
			description: "I like watching the waves.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"0190051e-9ac6-7a56-ae9d-0e310635ea45/preview.webm",
			height: 1277,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fd-33ab-77ae-8c0e-91e8ebc4236e/compressed.webp",
			description: "The set for the Djesse Vol. 4 tour!",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fd-33ab-77ae-8c0e-91e8ebc4236e/preview.webp",
			height: 768,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fd-02c7-78b0-8289-db5bc16b00e5/compressed.webp",
			description:
				'Jacob Collier playing "Little Blue" on his five-string guitar. I\'m DAEAD!',
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fd-02c7-78b0-8289-db5bc16b00e5/preview.webp",
			height: 876,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"01900511-6b87-7329-a3cc-c9f023273257/compressed.webm",
			description:
				"As the sun sets, it casts a shimmering path over the estuary.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"01900511-6b87-7329-a3cc-c9f023273257/preview.webm",
			height: 768,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"01900502-47a6-788a-bca1-f361b3dab5a8/compressed.webp",
			description:
				"Standing by a serene pond underneath the shadow of a wisteria tree.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"01900502-47a6-788a-bca1-f361b3dab5a8/preview.webp",
			height: 768,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fc-c98d-792b-9184-b9fea619aa1b/compressed.webp",
			description:
				'"...the looking glass i will find the answer to all my questions..."',
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fc-c98d-792b-9184-b9fea619aa1b/preview.webp",
			height: 1365,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fc-97cc-70c5-8d81-8e443f8d1d6a/compressed.webm",
			description: "Poetry on the spot?! Yes, please!",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fc-97cc-70c5-8d81-8e443f8d1d6a/preview.webm",
			height: 1364,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6f9-b2a2-786f-9bc0-c58084d797cb/compressed.webm",
			description: "A view from the top of the Space Needle.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6f9-b2a2-786f-9bc0-c58084d797cb/preview.webm",
			height: 1366,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fb-fd48-7bbe-b6da-1bafe52d5e12/compressed.webp",
			description: "Out in the Chihuly garden.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fb-fd48-7bbe-b6da-1bafe52d5e12/preview.webp",
			height: 1365,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fb-c5d4-7c77-b054-927a7c905629/compressed.webp",
			description: "A Chihuly glass sculpture and its reflection.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fb-c5d4-7c77-b054-927a7c905629/preview.webp",
			height: 1365,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6fb-7245-7518-937a-7b56e7a18f9f/compressed.webp",
			description: "A Chihuly art installation — Winter Brilliance (2015).",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6fb-7245-7518-937a-7b56e7a18f9f/preview.webp",
			height: 768,
			width: 1024,
		},
		{
			compressed_bucket_name: "looking-glass",
			compressed_object_name:
				"018fb6f8-e4dd-72bf-ae05-8d51befa7cd7/compressed.webp",
			description: "A view from the bottom of the Space Needle.",
			preview_bucket_name: "looking-glass",
			preview_object_name:
				"018fb6f8-e4dd-72bf-ae05-8d51befa7cd7/preview.webp",
			height: 1365,
			width: 1024,
		},
	];

	const contentBlocks: MasonryContentBlock[] = objects.map((object) => {
		let content: ReactNode;
		let contentWithTooltip: ReactNode;

		const objectSrc = `https://minio.nuttyver.se/${object.compressed_bucket_name}/${object.compressed_object_name}`;
		const previewSrc = `https://minio.nuttyver.se/${object.preview_bucket_name}/${object.preview_object_name}`;

		if (objectSrc.endsWith(".webp")) {
			content = (
				<Image
					key={objectSrc}
					src={objectSrc}
					previewSrc={previewSrc}
					alt={object.description}
					height="100%"
					width="100%"
					style={{ objectFit: "cover" }}
					draggable={false}
				/>
			);
		} else {
			content = (
				<Video
					key={objectSrc}
					src={objectSrc}
					previewSrc={previewSrc}
					height="100%"
					width="100%"
					style={{ objectFit: "cover" }}
					draggable={false}
					autoPlay={true}
					loop={true}
				/>
			);
		}

		contentWithTooltip = (
			<Tooltip
				content={{
					type: "text",
					content: object.description,
				}}
			>
				{content}
			</Tooltip>
		);

		return {
			key: object.compressed_object_name,
			masonry: {
				content: contentWithTooltip,
				boundingBox: {
					width: object.width,
					height: object.height,
				},
			},
			lightbox: {
				content: content,
				boundingBox: {
					width: object.width,
					height: object.height,
				},
			},
			previous: null,
			next: null,
		};
	});

	return <Masonry contentBlocks={contentBlocks} />;
};
