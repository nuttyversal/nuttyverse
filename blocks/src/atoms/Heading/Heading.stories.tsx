import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
	title: "atoms/Heading",
	component: Heading,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: {
				type: "select",
			},
			options: ["h2", "h3", "h4", "h5", "h6"],
		},
	},
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const HeadingTwo: Story = {
	args: {
		children: "Hello, world! 😀",
		type: "h2",
	},
};

export const HeadingThree: Story = {
	args: {
		children: "Hello, world! 😀",
		type: "h3",
	},
};

export const HeadingFour: Story = {
	args: {
		children: "Hello, world! 😀",
		type: "h4",
	},
};

export const HeadingFive: Story = {
	args: {
		children: "Hello, world! 😀",
		type: "h5",
	},
};

export const HeadingSix: Story = {
	args: {
		children: "Hello, world! 😀",
		type: "h6",
	},
};
