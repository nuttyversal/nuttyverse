import React from "react";
import { Text } from "../Text/Text";
import { link } from "./Link.css";

type Props = {
	children: React.ReactNode;
	href: string;
	newTab?: boolean;
};

export const Link: React.FC<Props> = (props) => {
	return (
		<Text
			as="a"
			className={link}
			href={props.href}
			target={props.newTab ? "_blank" : ""}
		>
			{props.children}
		</Text>
	);
};
