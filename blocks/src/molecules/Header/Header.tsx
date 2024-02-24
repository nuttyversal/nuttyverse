import { Marquee } from "../../atoms/Marquee/Marquee";
import { Chibi } from "../../atoms/Chibi/Chibi";
import { Text } from "../../atoms/Text/Text";
import { chibi, container, divider, float, header } from "./Header.css";

export const Header = () => {
	const nuttyverse = "Nuttyverse".split("").map((letter, index) => (
		<Text
			as="span"
			size="6xl"
			className={[header, float].join(" ")}
			style={{ animationDelay: `${index * 0.3}s` }}
			wdth={50}
			weight={700}
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

			<div className={divider} />
			{messageOfTheDay}
			<div className={divider} />
		</div>
	);
};
