import { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text/Text";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "atoms/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: {
				type: "text",
			},
		},
		sparkle: {
			control: {
				type: "boolean",
			},
		},
		onClick: {
			action: "clicked",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Simple: Story = {
	args: {
		children: "Login",
	},
};

export const WithSparkle: Story = {
	args: {
		children: "Link start",
		sparkle: true,
	},
};

export const WithBanner: Story = {
	args: {
		children: "Explore my inner world",
		banner: {
			children: (
				<Text
					size="smol"
					style={{
						padding: "0 1em",
						fontFamily: "PragmataPro Liga, monospace",
						margin: "0.3em",
						color: "inherit",
					}}
				>
					Still under construction!
				</Text>
			),
		},
	},
};
