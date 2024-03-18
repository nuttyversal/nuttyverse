import { ReactNode, useContext } from "react";
import {
	container,
	darkMode,
	lightMode,
	marquee,
	marqueeShadowClone,
	overlay,
} from "./Marquee.css";
import { NuttyverseContext } from "~/styles/themes/context";

type Props = {
	/**
	 * Specifies the marquee's content.
	 */
	children: ReactNode;
};

export const Marquee = (props: Props) => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	return (
		<div className={[themeClass, container].join(" ")}>
			{/* Kage Bunshin no Jutsu */}
			<div className={marquee}>{props.children}</div>
			<div className={marqueeShadowClone}>{props.children}</div>

			{/* Fade content in and out. */}
			<div className={[themeClass, overlay].join(" ")} />
		</div>
	);
};
