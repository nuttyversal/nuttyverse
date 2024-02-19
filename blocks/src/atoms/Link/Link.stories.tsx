import { Meta, StoryObj } from "@storybook/react";
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
			<div>
				Into the <Link {...args} />!
			</div>
		);
	},
	args: {
		children: "Nuttyverse",
		href: "https://nuttyver.se/",
	},
};
