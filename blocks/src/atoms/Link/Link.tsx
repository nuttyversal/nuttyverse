import React, { useContext } from "react";
import { Text } from "~/atoms/Text/Text";
import { NuttyverseContext } from "~/styles/themes/context";
import { darkMode, lightMode, link, withGlow } from "./Link.css";

type Props = {
	children: React.ReactNode;
	href: string;
	newTab?: boolean;
	glow?: boolean;
};

export const Link: React.FC<Props> = (props) => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const classNames = [link, themeClass, props.glow ? withGlow : undefined]
		.filter((x) => x !== undefined)
		.join(" ");

	return (
		<Text
			as="a"
			className={classNames}
			href={props.href}
			target={props.newTab ? "_blank" : ""}
		>
			{props.children}
		</Text>
	);
};
