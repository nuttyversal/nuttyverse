import classNames from "classnames";
import { useContext } from "react";
import { Marquee } from "~/atoms/Marquee";
import { Text } from "~/atoms/Text";
import { NuttyverseContext } from "~/styles/themes/context";
import { container, darkMode, lightMode, text } from "./MessageOfTheDay.css";

export const MessageOfTheDay: React.FC = () => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	return (
		<div className={classNames([themeClass, container])}>
			<Marquee>
				<Text size="smol" weight={600} className={text}>
					Hello there, welcome to the Nuttyverse!
				</Text>
			</Marquee>
		</div>
	);
};
