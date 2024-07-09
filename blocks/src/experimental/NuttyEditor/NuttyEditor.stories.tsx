import { Meta, StoryObj } from "@storybook/react";
import { NuttyEditor } from "./NuttyEditor";

const meta: Meta<typeof NuttyEditor> = {
	title: "experimental/NuttyEditor",
	component: NuttyEditor,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NuttyEditor>;

export const Component: Story = {};
