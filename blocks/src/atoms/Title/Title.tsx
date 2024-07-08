import classNames from "classnames";
import { ReactNode } from "react";
import { Text } from "~/atoms/Text";
import { fleuron, mirror, title } from "./Title.css";

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
		<Text as="h1" className={title} weight={500} wdth={75} marginless>
			{props.fleuron && (
				<Text size="7xl" className={fleuron} marginless>
					☙
				</Text>
			)}

			{props.children}

			{props.fleuron && (
				<Text
					size="7xl"
					className={classNames([fleuron, mirror])}
					marginless
				>
					☙
				</Text>
			)}
		</Text>
	);
};
