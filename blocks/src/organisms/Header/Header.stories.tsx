import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
	title: "organisms/Header",
	component: Header,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Component: Story = {};
