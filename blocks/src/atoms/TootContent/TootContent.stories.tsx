import type { Meta, StoryObj } from "@storybook/react";
import { TootContent } from "./TootContent";
import { TootContainer, spacing } from "~/index";

const meta: Meta<typeof TootContent> = {
	title: "atoms/TootContent",
	component: TootContent,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TootContent>;

export const Component: Story = {
	render: (args) => {
		return (
			<TootContainer style={{ width: spacing[64], height: spacing[28] }}>
				<TootContent {...args} />
			</TootContainer>
		);
	},
	args: {
		content:
			"\u003Cp\u003EHello world! Finally got around to setting up a self-hosted Mastodon instance. It&#39;s empty. No one is here. 💤\u003C/p\u003E",
		createdAt: new Date(),
	},
};
