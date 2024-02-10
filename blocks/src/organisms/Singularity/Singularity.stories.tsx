import type { Meta, StoryObj } from "@storybook/react";
import { Singularity } from "./Singularity";

const meta: Meta<typeof Singularity> = {
	title: "organisms/Singularity",
	component: Singularity,
};

export default meta;

type Story = StoryObj<typeof Singularity>;

export const Component: Story = {};
