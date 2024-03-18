import { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text/Text";
import { UnorderedList } from "./UnorderedList";
import { ListItem } from "./ListItem";

const meta: Meta<typeof UnorderedList> = {
	title: "atoms/List/Unordered",
	component: UnorderedList,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UnorderedList>;

export const FlatList: Story = {
	render: () => (
		<Text as="div">
			<UnorderedList>
				<ListItem>Lith Harbor</ListItem>
				<ListItem>Henesys</ListItem>
				<ListItem>Ellinia</ListItem>
				<ListItem>Perion</ListItem>
				<ListItem>Kerning City</ListItem>
			</UnorderedList>
		</Text>
	),
};

export const NestedList: Story = {
	render: () => (
		<Text as="div">
			<UnorderedList>
				<ListItem>
					Lith Harbor
					<UnorderedList>
						<ListItem>Potion Shop</ListItem>
						<ListItem>Weapon Shop</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem>
					Henesys
					<UnorderedList>
						<ListItem>Free Market</ListItem>
						<ListItem>Pet Park</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem>Ellinia</ListItem>
				<ListItem>Perion</ListItem>
				<ListItem>Kerning City</ListItem>
			</UnorderedList>
		</Text>
	),
};
