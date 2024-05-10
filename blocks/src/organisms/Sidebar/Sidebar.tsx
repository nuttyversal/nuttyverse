import classNames from "classnames";
import { CSSProperties } from "react";
import { faCode } from "@fortawesome/pro-solid-svg-icons/faCode";
import { faPenNib } from "@fortawesome/pro-solid-svg-icons/faPenNib";
import { faUser } from "@fortawesome/pro-solid-svg-icons/faUser";
import { NavigationItemList } from "~/molecules/NavigationItemList";
import { container } from "./Sidebar.css";

type SidebarProps = {
	/**
	 * Additional class names to apply to the sidebar.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the sidebar.
	 */
	style?: CSSProperties;
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
	const navigationItems = [
		{
			name: "Design",
			icon: faPenNib,
			href: "https://blocks.nuttyver.se/",
			external: true,
		},
		{
			name: "Code",
			icon: faCode,
			href: "https://code.nuttyver.se/",
			external: true,
		},
		{
			name: "Profile",
			icon: faUser,
			href: "https://neocities.org/site/nuttyverse",
			external: true,
		},
	];

	return (
		<div
			className={classNames([container, props.className])}
			style={props.style}
		>
			<NavigationItemList items={navigationItems} />
		</div>
	);
};