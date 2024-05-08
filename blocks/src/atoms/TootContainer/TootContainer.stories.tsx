import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text";
import { spacing } from "~/styles/tokens/spacing";
import { TootContainer } from "./TootContainer";

const meta: Meta<typeof TootContainer> = {
	title: "atoms/TootContainer",
	component: TootContainer,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TootContainer>;

export const Component: Story = {
	render: (args) => {
		return (
			<TootContainer {...args}>
				<Text size="smol" style={{ color: "inherit" }} marginless>
					Hello world! Finally got around to setting up a self-hosted
					Mastodon instance. It's empty. No one is here. 💤
				</Text>
			</TootContainer>
		);
	},
	args: {
		style: {
			height: spacing[40],
			width: spacing[48],
		},
	},
};
