import { Meta, StoryObj } from "@storybook/react";
import { colors } from "~/styles/themes/contract.css";
import { spacing } from "~/styles/tokens/spacing";
import { Button } from "~/atoms/Button";
import { Text } from "~/atoms/Text";
import { Tooltip } from "./Tooltip";

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
			<Text
				size="smol"
				style={{
					background: colors.gray.solid["12"],
					color: colors.gray.solid["01"],
					borderRadius: spacing[1],
					padding: spacing[2],
				}}
			>
				<p>Tooltip content</p>
			</Text>
		);

		return (
			<Tooltip content={tooltipContent}>
				<Button>Hover me</Button>
			</Tooltip>
		);
	},
};
