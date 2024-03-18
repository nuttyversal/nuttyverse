import { ReactNode } from "react";
import { unorderedList } from "./UnorderedList.css";

type Props = {
	/**
	 * Specifies the unordered list's content.
	 */
	children: ReactNode;
};

export const UnorderedList: React.FC<Props> = (props) => {
	return <ul className={unorderedList}>{props.children}</ul>;
};
