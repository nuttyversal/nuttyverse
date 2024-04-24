import { useContext } from "react";
import { NuttyverseContext } from "~/styles/themes/context";
import { spacing } from "~/styles/tokens/spacing";
import { Logo } from "~/atoms/Logo/Logo";
import { Marquee } from "~/atoms/Marquee/Marquee";
import { Text } from "~/atoms/Text/Text";
import { ChibiButton } from "~/molecules/ChibiButton/ChibiButton";
import {
	chibi,
	container,
	darkMode,
	marqueeBox,
	lightMode,
} from "./Header.css";

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
				<Logo style={{ marginBottom: `-${spacing.px}` }} />
				<ChibiButton className={chibi} onClick={context.toggleTheme} />
			</div>

			{messageOfTheDay}
		</div>
	);
};
