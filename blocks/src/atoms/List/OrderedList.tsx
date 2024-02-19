import React from "react";
import { orderedList } from "./OrderedList.css";

type Props = {
	children: React.ReactNode;
};

export const OrderedList: React.FC<Props> = (props) => {
	return <ol className={orderedList}>{props.children}</ol>;
};
