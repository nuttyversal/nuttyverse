import type { Meta, StoryObj } from "@storybook/react";
import { Introduction } from "./Introduction";

const meta: Meta<typeof Introduction> = {
	title: "molecules/Introduction",
	component: Introduction,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Introduction>;

export const Component: Story = {};
