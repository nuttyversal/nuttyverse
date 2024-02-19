import { listItem } from "./ListItem.css";

type Props = {
	children: React.ReactNode;
};

export const ListItem: React.FC<Props> = (props) => {
	return <li className={listItem}>{props.children}</li>;
};
