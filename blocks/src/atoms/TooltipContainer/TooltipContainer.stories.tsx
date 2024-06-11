import { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text";
import { TooltipContainer } from "./TooltipContainer";

const meta: Meta<typeof TooltipContainer> = {
	title: "atoms/TooltipContainer",
	component: TooltipContainer,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TooltipContainer>;

export const Component: Story = {
	render: () => {
		return (
			<TooltipContainer>
				<Text size="smol" marginless>
					Tooltip content
				</Text>
			</TooltipContainer>
		);
	},
};
