import { Meta, StoryObj } from "@storybook/react";
import { Chibi } from "./Chibi";

const meta: Meta<typeof Chibi> = {
	title: "atoms/Chibi",
	component: Chibi,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Chibi>;

export const Component: Story = {};
