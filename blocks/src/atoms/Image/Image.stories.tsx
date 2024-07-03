import type { Meta, StoryObj } from "@storybook/react";

import { Image } from "./Image";

const meta: Meta<typeof Image> = {
	title: "atoms/Image",
	component: Image,
	tags: ["autodocs"],
	argTypes: {
		src: {
			control: {
				type: "text",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Component: Story = {
	args: {
		width: "100%",
		src: "https://minio.nuttyver.se/looking-glass/01900502-47a6-788a-bca1-f361b3dab5a8/compressed.webp",
	},
};
