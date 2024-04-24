import { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
	title: "atoms/Logo",
	component: Logo,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Component: Story = {};
