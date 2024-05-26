import type { Meta, StoryObj } from "@storybook/react";

import { Video } from "./Video";

const meta: Meta<typeof Video> = {
	title: "atoms/Video",
	component: Video,
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

type Story = StoryObj<typeof Video>;

export const Component: Story = {
	args: {
		src: "https://minio.nuttyver.se/looking-glass/018fb3a6-7b41-7b20-aafb-73de38d8830c/compressed.webm",
		width: "100%",
		autoPlay: true,
		loop: true,
	},
};
