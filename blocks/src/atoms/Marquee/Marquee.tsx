import { useContext } from "react";
import {
	container,
	darkMode,
	lightMode,
	marquee,
	marqueeShadowClone,
	overlay,
} from "./Marquee.css";
import { NuttyverseContext } from "../../styles/themes/Context";

type Props = {
	children: React.ReactNode;
};

export const Marquee = (props: Props) => {
	const theme = useContext(NuttyverseContext);
	const themeClass = theme === "light" ? lightMode : darkMode;

	return (
		<div className={container}>
			{/* Kage Bunshin no Jutsu */}
			<div className={marquee}>{props.children}</div>
			<div className={marqueeShadowClone}>{props.children}</div>

			{/* Fade content in and out. */}
			<div className={[themeClass, overlay].join(" ")} />
		</div>
	);
};
