import { ReactNode } from "react";
import { Text } from "~/atoms/Text/Text";
import { link } from "./Link.css";

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
};

export const Link: React.FC<Props> = (props) => {
	return (
		<Text
			as="a"
			className={link}
			weight={500}
			href={props.href}
			target={props.newTab ? "_blank" : ""}
		>
			{props.children}
		</Text>
	);
};
