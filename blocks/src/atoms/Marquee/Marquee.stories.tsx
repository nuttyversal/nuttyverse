import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../../atoms/Text/Text";
import { Marquee } from "./Marquee";

const meta: Meta<typeof Marquee> = {
	title: "atoms/Marquee",
	component: Marquee,
	args: {
		children: (
			<Text
				style={{
					fontFamily: "PragmataPro Fraktur",
				}}
			>
				🐉 Happy Lunar New Year! 🐉
			</Text>
		),
	},
};

export default meta;

type Story = StoryObj<typeof Marquee>;

export const Component: Story = {};
