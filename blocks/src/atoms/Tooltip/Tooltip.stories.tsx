import { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/atoms/Button";
import { Tooltip } from "./Tooltip";
import { TooltipContainer } from "../TooltipContainer";

const meta: Meta<typeof Tooltip> = {
	title: "atoms/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Component: Story = {
	render: () => {
		const tooltipContent = (
			<TooltipContainer>Tooltip content</TooltipContainer>
		);

		return (
			<Tooltip content={tooltipContent}>
				<Button>Hover me</Button>
			</Tooltip>
		);
	},
};
