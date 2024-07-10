import { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "~/atoms/CodeBlock";
import { Heading } from "~/atoms/Heading";
import { Image } from "~/atoms/Image";
import { Title } from "~/atoms/Title";
import { Text } from "~/atoms/Text";
import { OrderedList } from "~/atoms/List";
import { UnorderedList } from "~/atoms/List";
import { ListItem } from "~/atoms/List";
import { QuoteBlock } from "~/atoms/QuoteBlock";
import { Video } from "~/atoms/Video";
import { ContentContainer } from "./ContentContainer";

const meta: Meta<typeof ContentContainer> = {
	title: "atoms/ContentContainer",
	component: ContentContainer,
	tags: ["autodocs"],
};

export default meta;

const bookCurse = [
	'"Please peruse & muse upon the code,',
	'but best not fork it," Nutty implores,',
	"lest, cursed, it might just explode,",
	'"For my style is mine & yours is yours."',
].join("\n");

type Story = StoryObj<typeof ContentContainer>;

export const Component: Story = {
	args: {
		children: (
			<>
				<Title fleuron>Content Container</Title>

				<Text dropCap>
					The ContentContainer component is a layout component that wraps
					content in a container. It is used to conditionally apply padding
					to content depending on the type of content being displayed.
				</Text>

				<Text>
					For example, paragraphs and lists will have padding applied to
					the left and right sides, whereas headings and code blocks will
					not.
				</Text>

				<Image src="https://minio.nuttyver.se/looking-glass/018fb6fb-7245-7518-937a-7b56e7a18f9f/compressed.webp" />

				<UnorderedList>
					<ListItem>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</ListItem>
					<ListItem>
						Curabitur id leo ut lorem luctus iaculis vitae nec quam.
					</ListItem>
					<ListItem>
						Aenean laoreet mauris a libero lobortis accumsan.
					</ListItem>
					<ListItem>
						Donec vitae ligula finibus, ultricies nulla vitae, pulvinar
						arcu.
					</ListItem>
				</UnorderedList>

				<Video src="https://minio.nuttyver.se/looking-glass/018fb6f9-b2a2-786f-9bc0-c58084d797cb/compressed.webm" />

				<OrderedList>
					<ListItem>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</ListItem>
					<ListItem>
						Curabitur id leo ut lorem luctus iaculis vitae nec quam.
					</ListItem>
					<ListItem>
						Aenean laoreet mauris a libero lobortis accumsan.
					</ListItem>
					<ListItem>
						Donec vitae ligula finibus, ultricies nulla vitae, pulvinar
						arcu.
					</ListItem>
				</OrderedList>

				<Heading type="h2">Full-width heading</Heading>

				<CodeBlock language="typescript" code={"const foo = bar;"} />

				<QuoteBlock citation="https://code.nuttyver.se/observable/nuttyverse/src/branch/main/curse.txt">
					<pre>{bookCurse}</pre>
				</QuoteBlock>
			</>
		),
	},
};
