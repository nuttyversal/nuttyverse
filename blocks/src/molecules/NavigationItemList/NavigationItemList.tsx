import { NavigationItem, NavigationItemProps } from "~/atoms/NavigationItem";
import { navigation, menu } from "./NavigationItemList.css";

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
			<menu className={menu}>
				{props.items.map((item) => (
					<NavigationItem key={item.name} {...item} />
				))}
			</menu>
		</nav>
	);
};
