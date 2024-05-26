import type { Meta, StoryObj } from "@storybook/react";
import { LookingGlass } from "./LookingGlass";

const meta: Meta<typeof LookingGlass> = {
	title: "organisms/LookingGlass",
	component: LookingGlass,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LookingGlass>;

export const Component: Story = {};
