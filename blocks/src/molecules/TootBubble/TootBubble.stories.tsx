import type { Meta, StoryObj } from "@storybook/react";
import { TootBubble } from "./TootBubble";

const meta: Meta<typeof TootBubble> = {
	title: "molecules/TootBubble",
	component: TootBubble,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TootBubble>;

export const Component: Story = {};
