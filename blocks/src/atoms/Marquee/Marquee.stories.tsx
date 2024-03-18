import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text/Text";
import { Marquee } from "./Marquee";

const meta: Meta<typeof Marquee> = {
	title: "atoms/Marquee",
	component: Marquee,
	tags: ["autodocs"],
	args: {
		children: (
			<Text
				style={{
					fontFamily: "PragmataPro Fraktur",
				}}
			>
				Welcome to the Nuttyverse!
			</Text>
		),
	},
};

export default meta;

type Story = StoryObj<typeof Marquee>;

export const Component: Story = {};
