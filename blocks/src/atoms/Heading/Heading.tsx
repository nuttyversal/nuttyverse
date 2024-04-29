import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSparkle } from "@fortawesome/pro-regular-svg-icons";
import { experimentalTypeScale } from "~/styles/tokens/typography";
import { Text } from "~/atoms/Text";
import { heading } from "./Heading.css";

type HeadingProps = {
	/**
	 * Specifies the heading content.
	 */
	children: ReactNode;

	/**
	 * Specifies the heading level.
	 */
	type: "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Heading: React.FC<HeadingProps> = (props) => {
	const sizeToken = (
		{
			h2: "4xl",
			h3: "3xl",
			h4: "2xl",
			h5: "xl",
			h6: "base",
		} as const
	)[props.type as string];

	const fontSize = experimentalTypeScale[sizeToken ?? "base"];

	return (
		<Text as={props.type} wdth={75} weight={500} className={heading}>
			<FontAwesomeIcon style={{ height: fontSize }} icon={faSparkle} />{" "}
			{props.children}
		</Text>
	);
};
