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
	if (props.type === ("h1" as string)) {
		throw new Error("'h1' not allowed. Use the Title component instead.");
	}

	const sizeToken = (
		{
			h2: "3xl",
			h3: "2xl",
			h4: "xl",
			h5: "base",
			h6: "smol",
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
