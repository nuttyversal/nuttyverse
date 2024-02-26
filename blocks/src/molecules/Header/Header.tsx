import { useContext } from "react";
import { Marquee } from "../../atoms/Marquee/Marquee";
import { Chibi } from "../../atoms/Chibi/Chibi";
import { Text } from "../../atoms/Text/Text";
import {
	chibi,
	container,
	darkMode,
	divider,
	float,
	header,
	lightMode,
} from "./Header.css";
import { NuttyverseContext } from "../../styles/themes/Context";

export const Header = () => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const nuttyverse = "Nuttyverse".split("").map((letter, index) => (
		<Text
			as="span"
			size="6xl"
			className={[themeClass, header, float].join(" ")}
			style={{ animationDelay: `${index * 0.3}s` }}
			wdth={50}
			weight={700}
			glow
		>
			{letter}
		</Text>
	));

	const messageOfTheDay = (
		<Marquee>
			<Text
				style={{
					lineHeight: "0",
					margin: "1em",
					fontFamily: "PragmataPro Fraktur",
				}}
			>
				Hello there, welcome to the Nuttyverse!
			</Text>
		</Marquee>
	);

	return (
		<div>
			<div className={container}>
				<div>{nuttyverse}</div>
				<Chibi className={chibi} />
			</div>

			<div className={[themeClass, divider].join(" ")} />
			{messageOfTheDay}
			<div className={[themeClass, divider].join(" ")} />
		</div>
	);
};
