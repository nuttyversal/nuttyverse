import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";
import { typeScale } from "../../styles/themes/constants";

const meta: Meta<typeof Text> = {
	title: "atoms/Text",
	component: Text,
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: {
				type: "text",
			},
		},
		size: {
			control: {
				type: "select",
			},
			options: Object.keys(typeScale),
		},
		opsz: {
			control: {
				type: "range",
				min: 12,
				max: 72,
				step: 1,
			},
		},
		wdth: {
			control: {
				type: "range",
				min: 75,
				max: 125,
				step: 1,
			},
		},
		weight: {
			control: {
				type: "range",
				min: 100,
				max: 900,
				step: 1,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Text>;

export const WithDropCap: Story = {
	args: {
		children:
			"Welcome to my internet expanse. You might notice a seeming " +
			"emptiness, but do not fret. You've simply arrived early enough to " +
			"witness the expansion of this universe.",
		dropCap: true,
	},
};

export const HeadingOne: Story = {
	args: {
		children: "Hello, world! 😀",
		as: "h1",
	},
};

export const HeadingTwo: Story = {
	args: {
		children: "Hello, world! 😀",
		as: "h2",
	},
};

export const HeadingThree: Story = {
	args: {
		children: "Hello, world! 😀",
		as: "h3",
	},
};

export const HeadingFour: Story = {
	args: {
		children: "Hello, world! 😀",
		as: "h4",
	},
};

export const HeadingFive: Story = {
	args: {
		children: "Hello, world! 😀",
		as: "h5",
	},
};

export const HeadingSix: Story = {
	args: {
		children: "Hello, world! 😀",
		as: "h6",
	},
};

export const Body: Story = {
	args: {
		children: "Hello, world! 😀",
		size: "base",
	},
};

export const Smol: Story = {
	args: {
		children: "Hello, world! 😀",
		size: "smol",
	},
};

export const Teeny: Story = {
	args: {
		children: "Hello, world! 😀",
		size: "teeny",
	},
};
