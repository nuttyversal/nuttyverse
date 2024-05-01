import { Meta, StoryObj } from "@storybook/react";
import { QuoteBlock } from "./QuoteBlock";

const meta: Meta<typeof QuoteBlock> = {
	title: "atoms/QuoteBlock",
	component: QuoteBlock,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof QuoteBlock>;

const bookCurse = [
	'"Please peruse & muse upon the code,',
	'but best not fork it," Nutty implores,',
	"lest, cursed, it might just explode,",
	'"For my style is mine & yours is yours."',
].join("\n");

export const Component: Story = {
	args: {
		children: (
			<pre
				style={{
					fontFamily: "PragmataPro Liga",
				}}
			>
				{bookCurse}
			</pre>
		),
		citation:
			"https://code.nuttyver.se/observable/nuttyverse/src/branch/main/curse.txt",
	},
};
