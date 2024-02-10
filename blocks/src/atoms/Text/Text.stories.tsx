import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";
import { text } from "./Text.css";

const meta: Meta<typeof Text> = {
	title: "atoms/Text",
	component: Text,
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
			options: Object.keys(text.classNames.variants.size),
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

export const Component: Story = {
	args: {
		children: "Hello, world!",
		size: "body",
		opsz: 18,
		wdth: 85,
		weight: 400,
	},
};

export const PolymorphicExample: Story = {
	render: (args) => (
		<section>
			<Text as="h1" {...args}>
				Text as a polymorphic component (h1)
			</Text>

			<Text as="h2" {...args}>
				This is a subheading (h2)
			</Text>

			<Text as="p" {...args}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
				euismod, nisl eget ultricies aliquam, neque diam aliquet nisi, nec
				tincidunt elit urna nec quam. Aliquam erat volutpat. Nulla facilisi.
				Nulla facilisi. Donec quis ligula sit amet nibh aliquet ultricies.
				Nulla facilisi. Sed non magna id magna ornare aliquet. Sed sit amet
				ipsum mauris. (p)
			</Text>

			<Text as="p" {...args}>
				Aliquam erat volutpat. Nulla facilisi. Nulla facilisi. Donec quis
				ligula sit amet nibh aliquet ultricies. Nulla facilisi. Sed non
				magna id magna ornare aliquet. Sed sit amet ipsum mauris. Nullam
				euismod, nisl eget ultricies aliquam, neque diam aliquet nisi, nec
				tincidunt elit urna nec quam. (p)
			</Text>

			<Text as="p" {...args}>
				This is a{" "}
				<Text as="a" href="https://nuttyver.se">
					link (a)
				</Text>{" "}
				inside of a paragraph. (p)
			</Text>

			<Text as="span" {...args}>
				— Nuttyverse Blocks (span)
			</Text>
		</section>
	),
};
