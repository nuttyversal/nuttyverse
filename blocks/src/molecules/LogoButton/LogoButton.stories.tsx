import type { Meta, StoryObj } from "@storybook/react";

import { LogoButton } from "./LogoButton";

const meta: Meta<typeof LogoButton> = {
	title: "molecules/LogoButton",
	component: LogoButton,
	tags: ["autodocs"],
	argTypes: {
		onClick: {
			action: "clicked",
		},
	},
};

export default meta;

type Story = StoryObj<typeof LogoButton>;

export const Component: Story = {
	render: (args) => (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<LogoButton {...args} />
		</div>
	),
};
