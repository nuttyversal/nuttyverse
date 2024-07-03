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
		src: "https://minio.nuttyver.se/looking-glass/0190051e-9ac6-7a56-ae9d-0e310635ea45/compressed.webm",
		width: "100%",
		autoPlay: true,
		loop: true,
	},
};
