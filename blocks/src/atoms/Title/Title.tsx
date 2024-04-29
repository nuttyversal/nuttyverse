import { ReactNode } from "react";
import { Text } from "~/atoms/Text";
import { title } from "./Title.css";

type TitleProps = {
	/**
	 * Specifies the text's content.
	 */
	children: ReactNode;

	/**
	 * If enabled (`true`), wraps the `children` with ☙ fleuron ❧.
	 */
	fleuron?: boolean;
};

export const Title: React.FC<TitleProps> = (props) => {
	return (
		<Text as="h2" className={title} weight={500} wdth={75}>
			{props.fleuron && "☙ "}
			{props.children}
			{props.fleuron && " ❧"}
		</Text>
	);
};
