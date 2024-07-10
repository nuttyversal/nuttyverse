import { ReactNode } from "react";
import { orderedList } from "./OrderedList.css";

type Props = {
	/**
	 * Specifies the ordered list's content.
	 */
	children: ReactNode;

	/**
	 * If enabled (`true`), disables the application of natural margin styles.
	 */
	marginless?: boolean;
};

export const OrderedList: React.FC<Props> = (props) => {
	// Consistent rem-based margin.
	const margin = "1.2rem 0";

	const listStyles = {
		margin: props.marginless ? undefined : margin,
	};

	return (
		<ol className={orderedList} style={listStyles}>
			{props.children}
		</ol>
	);
};
