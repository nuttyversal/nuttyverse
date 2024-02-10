import type { Meta, StoryObj } from "@storybook/react";
import { Introduction } from "./Introduction";

const meta: Meta<typeof Introduction> = {
	title: "molecules/Introduction",
	component: Introduction,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Component: Story = {};
