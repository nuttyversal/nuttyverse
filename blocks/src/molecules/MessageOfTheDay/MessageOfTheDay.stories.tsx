import type { Meta, StoryObj } from "@storybook/react";
import { MessageOfTheDay } from "./MessageOfTheDay";

const meta: Meta<typeof MessageOfTheDay> = {
	title: "molecules/MessageOfTheDay",
	component: MessageOfTheDay,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MessageOfTheDay>;

export const Component: Story = {};
