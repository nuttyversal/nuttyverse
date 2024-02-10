import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
	title: "molecules/Header",
	component: Header,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Component: Story = {};
