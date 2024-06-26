import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "~/atoms/Image";
import { ImageGrid } from "./ImageGrid";

const meta: Meta<typeof ImageGrid> = {
	title: "molecules/ImageGrid",
	component: ImageGrid,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ImageGrid>;

export const Component: Story = {
	render: () => {
		return (
			<ImageGrid>
				<Image src="https://media.discordapp.net/attachments/1152781299342381056/1239103835851587624/HEIC_to_WEBP_conversion_result_1.webp?ex=6641b4df&is=6640635f&hm=e1bf801829b355e243d38c2ce596425e318486f1849f1435466d98389db3510f&=&format=webp&width=1052&height=1402" />
				<Image src="https://media.discordapp.net/attachments/1152781299342381056/1239103853849215006/HEIC_to_WEBP_conversion.webp?ex=6641b4e4&is=66406364&hm=5d2a26f1e8ee475a2ee8f315c9957ce0bba1f2fbb135cbe39af92f4dc7beb911&=&format=webp&width=1052&height=1402" />
				<Image src="https://media.discordapp.net/attachments/1152781299342381056/1239103838829674516/HEIC_to_WEBP_conversion_result_4.webp?ex=6641b4e0&is=66406360&hm=98102dffb5fcaad71846da0cd0ca7a8978591171e8f1304dac6df6a0a2512f2d&=&format=webp&width=1052&height=1402" />
				<Image src="https://cdn.discordapp.com/attachments/1152781299342381056/1239103836564488303/HEIC_to_WEBP_conversion_result_2.webp?ex=6641b4e0&is=66406360&hm=974189a34a6ae81f5f45f8710d5e0341df3bdb77ea4c041264938460bed210c5&" />
				<Image src="https://cdn.discordapp.com/attachments/1152781299342381056/1239103837621715014/HEIC_to_WEBP_conversion_result_3.webp?ex=6641b4e0&is=66406360&hm=bef40158ed1fde869b53989277d9f3f7ff7ed40cf64f2f569860f64c4165a222&" />
			</ImageGrid>
		);
	},
};
