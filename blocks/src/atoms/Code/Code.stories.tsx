import { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/atoms/Text";
import { Code } from "./Code";

const meta: Meta<typeof Code> = {
	title: "atoms/Code",
	component: Code,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Component: Story = {
	render: () => (
		<Text>
			An abstract datatype <Code>f a</Code>, which has the ability for its
			value(s) to be mapped over, can become an instance of the{" "}
			<Code>Functor</Code> typeclass. That is to say, a new{" "}
			<Code>Functor</Code>, <Code>f b</Code>, can be made from{" "}
			<Code>f a</Code> by transforming all of its value(s), whilst leaving
			the structure of <Code>f</Code> itself unmodified.
		</Text>
	),
};
