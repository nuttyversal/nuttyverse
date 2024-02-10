import { Chibi } from "../../atoms/Chibi/Chibi";
import { Text } from "../../atoms/Text/Text";
import { text } from "../../atoms/Text/Text.css";
import { chibi, container, divider, float, header } from "./Header.css";

export const Header = () => {
	const nuttyverse = "Nuttyverse".split("").map((letter, index) => (
		<Text
			as="span"
			className={[text({ size: "h1" }), float, header].join(" ")}
			style={{ animationDelay: `${index * 0.3}s` }}
			wdth={50}
			weight={700}
		>
			{letter}
		</Text>
	));

	return (
		<div>
			<div className={container}>
				<div>{nuttyverse}</div>
				<Chibi className={chibi} />
			</div>

			<div className={divider} />
		</div>
	);
};
