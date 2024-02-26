import type { Meta, StoryObj } from "@storybook/react";

import { ChibiButton } from "./ChibiButton";

const meta: Meta<typeof ChibiButton> = {
	title: "molecules/ChibiButton",
	component: ChibiButton,
	tags: ["autodocs"],
	argTypes: {
		onClick: {
			action: "clicked",
		},
	},
};

export default meta;

type Story = StoryObj<typeof ChibiButton>;

export const Component: Story = {};
