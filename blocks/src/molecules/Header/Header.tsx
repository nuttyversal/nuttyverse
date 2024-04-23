import { useContext } from "react";
import { Marquee } from "~/atoms/Marquee/Marquee";
import { Text } from "~/atoms/Text/Text";
import { ChibiButton } from "~/molecules/ChibiButton/ChibiButton";
import { NuttyverseContext } from "~/styles/themes/context";
import {
	chibi,
	container,
	darkMode,
	marqueeBox,
	header,
	lightMode,
} from "./Header.css";

export const Header = () => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const nuttyverse = (
		<Text
			className={[themeClass, header].join(" ")}
			size="6xl"
			as="span"
			wdth={125}
			weight={900}
		>
			Nuttyverse
		</Text>
	);

	const messageOfTheDay = (
		<div className={[themeClass, marqueeBox].join(" ")}>
			<Marquee>
				<Text
					size="smol"
					weight={600}
					style={{
						lineHeight: "0",
						margin: "1em",
						fontFamily: "PragmataPro Liga",
					}}
				>
					Hello there, welcome to the Nuttyverse!
				</Text>
			</Marquee>
		</div>
	);

	return (
		<div>
			<div className={container}>
				<div>{nuttyverse}</div>
				<ChibiButton className={chibi} onClick={context.toggleTheme} />
			</div>

			{messageOfTheDay}
		</div>
	);
};
