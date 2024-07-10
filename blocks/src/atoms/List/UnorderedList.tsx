import { ReactNode } from "react";
import { unorderedList } from "./UnorderedList.css";

type Props = {
	/**
	 * Specifies the unordered list's content.
	 */
	children: ReactNode;

	/**
	 * If enabled (`true`), disables the application of natural margin styles.
	 */
	marginless?: boolean;
};

export const UnorderedList: React.FC<Props> = (props) => {
	// Consistent rem-based margin.
	const margin = "1.2rem 0";

	const listStyles = {
		margin: props.marginless ? undefined : margin,
	};

	return (
		<ul className={unorderedList} style={listStyles}>
			{props.children}
		</ul>
	);
};
