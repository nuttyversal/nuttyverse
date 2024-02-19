import React from "react";
import { unorderedList } from "./UnorderedList.css";

type Props = {
	children: React.ReactNode;
};

export const UnorderedList: React.FC<Props> = (props) => {
	return <ul className={unorderedList}>{props.children}</ul>;
};
