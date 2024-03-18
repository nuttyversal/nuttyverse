import { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text/Text";
import { OrderedList } from "./OrderedList";
import { ListItem } from "./ListItem";

const meta: Meta<typeof OrderedList> = {
	title: "atoms/List/Ordered",
	component: OrderedList,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof OrderedList>;

export const FlatList: Story = {
	render: () => (
		<Text as="div">
			<OrderedList>
				<ListItem>Lith Harbor</ListItem>
				<ListItem>Henesys</ListItem>
				<ListItem>Ellinia</ListItem>
				<ListItem>Perion</ListItem>
				<ListItem>Kerning City</ListItem>
			</OrderedList>
		</Text>
	),
};

export const NestedList: Story = {
	render: () => (
		<Text as="div">
			<OrderedList>
				<ListItem>
					Lith Harbor
					<OrderedList>
						<ListItem>Potion Shop</ListItem>
						<ListItem>Weapon Shop</ListItem>
					</OrderedList>
				</ListItem>
				<ListItem>
					Henesys
					<OrderedList>
						<ListItem>Free Market</ListItem>
						<ListItem>Pet Park</ListItem>
					</OrderedList>
				</ListItem>
				<ListItem>Ellinia</ListItem>
				<ListItem>Perion</ListItem>
				<ListItem>Kerning City</ListItem>
			</OrderedList>
		</Text>
	),
};
