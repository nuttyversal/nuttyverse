import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "./Masonry";

const meta: Meta<typeof Masonry> = {
	title: "experimental/Masonry",
	component: Masonry,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Masonry>;

export const Component: Story = {};
