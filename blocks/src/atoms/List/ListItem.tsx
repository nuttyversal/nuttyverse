import { ReactNode } from "react";
import { listItem } from "./ListItem.css";

type Props = {
	/**
	 * Specifies the list item's content.
	 */
	children: ReactNode;
};

export const ListItem: React.FC<Props> = (props) => {
	return <li className={listItem}>{props.children}</li>;
};
