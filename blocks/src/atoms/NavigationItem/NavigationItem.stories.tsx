import { Meta, StoryObj } from "@storybook/react";
import { faGalaxy } from "@fortawesome/pro-solid-svg-icons/faGalaxy";
import { NavigationItem } from "./NavigationItem";

const meta: Meta<typeof NavigationItem> = {
	title: "atoms/NavigationItem",
	component: NavigationItem,
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

type Story = StoryObj<typeof NavigationItem>;

export const WithActiveSelection: Story = {
	render: (args) => {
		return <NavigationItem {...args} />;
	},
	args: {
		name: "Singularity",
		icon: faGalaxy,
		href: "https://nuttyver.se/",
		active: true,
	},
};

export const WithExternalLink: Story = {
	render: (args) => {
		return <NavigationItem {...args} />;
	},
	args: {
		name: "Nuttyverse",
		icon: faGalaxy,
		href: "https://nuttyver.se/",
		external: true,
	},
};
