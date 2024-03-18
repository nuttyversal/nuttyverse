import { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text/Text";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
	title: "atoms/Link",
	component: Link,
	tags: ["autodocs"],
	argTypes: {
		href: {
			control: {
				type: "text",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Component: Story = {
	render: (args) => {
		return (
			<Text>
				Into the <Link {...args} />!
			</Text>
		);
	},
	args: {
		children: "Nuttyverse",
		href: "https://nuttyver.se/",
	},
};
