import { Meta, StoryObj } from "@storybook/react";
import { faCode } from "@fortawesome/pro-solid-svg-icons/faCode";
import { faGalaxy } from "@fortawesome/pro-solid-svg-icons/faGalaxy";
import { faPenNib } from "@fortawesome/pro-solid-svg-icons/faPenNib";
import { faUser } from "@fortawesome/pro-solid-svg-icons/faUser";
import { NavigationItemList } from "./NavigationItemList";

const meta: Meta<typeof NavigationItemList> = {
	title: "molecules/NavigationItemList",
	component: NavigationItemList,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NavigationItemList>;

export const Component: Story = {
	render: (args) => {
		return <NavigationItemList {...args} />;
	},
	args: {
		items: [
			{
				name: "Singularity",
				icon: faGalaxy,
				href: "https://nuttyver.se/",
				active: true,
			},
			{
				name: "Design",
				icon: faPenNib,
				href: "https://blocks.nuttyver.se/",
				external: true,
			},
			{
				name: "Code",
				icon: faCode,
				href: "https://code.nuttyver.se/",
				external: true,
			},
			{
				name: "Profile",
				icon: faUser,
				href: "https://neocities.org/site/nuttyverse",
				external: true,
			},
		],
	},
};
