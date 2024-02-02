import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	component: Button,
	argTypes: {
		children: {
			control: {
				type: "text",
			},
		},
		sparkle: {
			control: {
				type: "boolean",
			},
		},
		onClick: {
			action: "clicked",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Component: Story = {
	args: {
		children: "Hello, world!",
	},
};
