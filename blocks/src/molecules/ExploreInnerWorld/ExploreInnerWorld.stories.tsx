import type { Meta, StoryObj } from "@storybook/react";
import { ExploreInnerWorld } from "./ExploreInnerWorld";

const meta: Meta<typeof ExploreInnerWorld> = {
	title: "molecules/ExploreInnerWorld",
	component: ExploreInnerWorld,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ExploreInnerWorld>;

export const Component: Story = {};
