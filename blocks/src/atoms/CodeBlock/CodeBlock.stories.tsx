import { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";
import sourceCode from "./CodeBlock?raw";

const meta: Meta<typeof CodeBlock> = {
	title: "atoms/CodeBlock",
	component: CodeBlock,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Component: Story = {
	args: {
		code: sourceCode,
		language: "typescript",
	},
};
