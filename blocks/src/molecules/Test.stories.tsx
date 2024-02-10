import type { Meta, StoryObj } from "@storybook/react";
import { Test } from "./Test";

const meta: Meta<typeof Test> = {
	title: "molecules/Test",
	component: Test,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Component: Story = {};
