import { Marquee } from "~/atoms/Marquee";
import { Text } from "~/atoms/Text";
import { container, text } from "./MessageOfTheDay.css";

export const MessageOfTheDay: React.FC = () => {
	return (
		<div className={container}>
			<Marquee>
				<Text size="smol" weight={600} className={text}>
					Hello there, welcome to the Nuttyverse!
				</Text>
			</Marquee>
		</div>
	);
};
