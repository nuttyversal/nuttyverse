import { Meta, StoryObj } from "@storybook/react";
import { Title } from "./Title";

const meta: Meta<typeof Title> = {
	title: "atoms/Title",
	component: Title,
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: {
				type: "text",
			},
		},
		fleuron: {
			control: {
				type: "boolean",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Simple: Story = {
	args: {
		children: "Title",
	},
};

export const WithFleuron: Story = {
	args: {
		children: "Pretty title",
		fleuron: true,
	},
};
