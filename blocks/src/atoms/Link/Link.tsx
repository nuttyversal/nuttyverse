import { ReactNode, useContext } from "react";
import classNames from "classnames";
import { Text } from "~/atoms/Text/Text";
import { NuttyverseContext } from "~/styles/themes/context";
import { darkMode, lightMode, link, withGlow } from "./Link.css";

type Props = {
	/**
	 * Specifies the link's content.
	 */
	children: ReactNode;

	/**
	 * Specifies the link's URL.
	 */
	href: string;

	/**
	 * If enabled (`true`), opens the link in a new tab.
	 */
	newTab?: boolean;

	/**
	 * If enabled (`true`), applies a glow effect to the link in dark mode.
	 */
	glow?: boolean;
};

export const Link: React.FC<Props> = (props) => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const linkClassNames = classNames(link, themeClass, {
		[withGlow]: props.glow,
	});

	return (
		<Text
			as="a"
			className={linkClassNames}
			href={props.href}
			target={props.newTab ? "_blank" : ""}
		>
			{props.children}
		</Text>
	);
};
