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
	lightMode,
} from "./Header.css";
import { Logo } from "~/atoms/Logo/Logo";

export const Header = () => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

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
				<Logo />
				<ChibiButton className={chibi} onClick={context.toggleTheme} />
			</div>

			{messageOfTheDay}
		</div>
	);
};
