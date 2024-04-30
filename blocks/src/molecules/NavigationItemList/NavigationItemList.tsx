import { NavigationItem, NavigationItemProps } from "~/atoms/NavigationItem";
import { navigation } from "./NavigationItemList.css";

type NavigationItemListProps = {
	/**
	 * List of navigation items to display in navigation item list.
	 */
	items: NavigationItemProps[];
};

export const NavigationItemList: React.FC<NavigationItemListProps> = (
	props,
) => {
	return (
		<nav className={navigation}>
			{props.items.map((item) => (
				<NavigationItem {...item} />
			))}
		</nav>
	);
};
