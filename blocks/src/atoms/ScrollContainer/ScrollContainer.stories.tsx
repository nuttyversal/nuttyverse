import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text";
import { spacing } from "~/styles/tokens/spacing";
import { ScrollContainer } from "./ScrollContainer";
import { ScrollGradientContainer } from "./ScrollGradientContainer";
import { ScrollGradient } from "./ScrollGradient";

const meta: Meta<typeof ScrollContainer> = {
	title: "atoms/ScrollContainer",
	component: ScrollContainer,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ScrollContainer>;

export const Component: Story = {
	render: (args) => {
		return (
			<ScrollGradientContainer>
				<ScrollGradient part="top" /* client:only="react" */ />
				<ScrollContainer {...args}>
					<Text dropCap>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
						sagittis est convallis condimentum suscipit. Nunc egestas
						suscipit magna, non faucibus urna. Nulla finibus nisl vitae
						tellus dictum faucibus. Donec lobortis dictum semper. Sed sed
						leo sit amet lacus consequat fermentum porttitor ac mauris.
						Etiam vitae cursus turpis. Aenean et ullamcorper velit. Nam
						iaculis magna non quam bibendum, sit amet pellentesque justo
						accumsan. Maecenas sit amet neque id orci porta suscipit.
						Integer at nisi sed ex sagittis semper. Sed est nisl, viverra
						in dolor sit amet, aliquet luctus nisi. Sed non massa velit.
						Pellentesque scelerisque lorem ut enim vehicula bibendum.
						Pellentesque et consectetur tellus. Nulla molestie iaculis
						ligula, ut accumsan lectus malesuada eget. Vestibulum
						facilisis mattis ligula, vitae dictum magna rhoncus ac.
					</Text>

					<Text>
						Nullam a neque eleifend, vestibulum ligula sed, facilisis
						felis. Phasellus vel iaculis lorem. Sed tincidunt, lacus nec
						tristique egestas, nunc arcu porttitor risus, in imperdiet
						sapien neque eget quam. Vivamus odio arcu, rutrum et accumsan
						at, interdum at lectus. Cras rhoncus tincidunt tempor.
						Pellentesque consectetur ac dui vitae porta. Nam egestas lacus
						mauris, eu aliquet nulla consequat non. Phasellus id magna
						lacinia, cursus mi vel, aliquam massa. Donec dapibus pulvinar
						nisi, in blandit leo semper non. Maecenas luctus dolor at
						semper malesuada.
					</Text>

					<Text>
						Curabitur sollicitudin lorem purus. Fusce volutpat nec purus
						accumsan hendrerit. Ut tempus erat eget libero posuere cursus
						id a lorem. Sed porttitor blandit diam, vitae ultricies nisl
						molestie sed. Curabitur porta mattis pulvinar. Pellentesque
						eget felis rhoncus, malesuada urna sit amet, gravida lorem.
						Donec quis rhoncus magna. Maecenas interdum et urna accumsan
						posuere. Donec fringilla id urna eget malesuada. Ut commodo
						lorem at vulputate imperdiet.
					</Text>

					<Text>
						Curabitur molestie felis sit amet nulla finibus, a
						pellentesque odio molestie. Morbi augue mauris, fringilla vel
						cursus vitae, accumsan vulputate massa. Maecenas tempus nec
						augue id varius. Aenean blandit condimentum nulla. Mauris sit
						amet magna eget dolor dapibus luctus tristique vel nisi.
						Maecenas feugiat libero at tempor lobortis. Suspendisse
						vulputate mauris nec augue finibus, a semper sem auctor. Morbi
						pellentesque sapien aliquet nulla efficitur aliquam.
						Vestibulum sed est sit amet tellus malesuada mollis non
						hendrerit quam.
					</Text>

					<Text>
						Quisque at libero vitae neque condimentum laoreet in vel nunc.
						Donec pulvinar lacus vel nulla efficitur volutpat. Fusce eu
						elit interdum odio aliquet pulvinar. Fusce et mauris feugiat,
						placerat lectus mattis, congue enim. Mauris eu viverra est,
						non lobortis ex. Ut quis purus feugiat, ultrices felis eu,
						viverra enim. Sed a sollicitudin est, vitae ultrices eros.
						Pellentesque et lorem vel lectus malesuada tempor id vel nunc.
						Nunc pharetra nunc metus, sed viverra ex condimentum eget.
					</Text>
				</ScrollContainer>
				<ScrollGradient part="bottom" /* client:only="react" */ />
			</ScrollGradientContainer>
		);
	},
	args: {
		style: {
			height: spacing[64],
		},
	},
};
