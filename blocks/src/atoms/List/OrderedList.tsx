import { ReactNode } from "react";
import { orderedList } from "./OrderedList.css";

type Props = {
	/**
	 * Specifies the ordered list's content.
	 */
	children: ReactNode;
};

export const OrderedList: React.FC<Props> = (props) => {
	return <ol className={orderedList}>{props.children}</ol>;
};
