import classNames from "classnames";
import { CSSProperties } from "react";
import { faAperture } from "@fortawesome/pro-solid-svg-icons/faAperture";
import { faBedFront } from "@fortawesome/pro-solid-svg-icons/faBedFront";
import { faCode } from "@fortawesome/pro-solid-svg-icons/faCode";
import { faPenNib } from "@fortawesome/pro-solid-svg-icons/faPenNib";
import { faTrillium } from "@fortawesome/pro-solid-svg-icons/faTrillium";
import { faUser } from "@fortawesome/pro-solid-svg-icons/faUser";
import { NavigationItemProps } from "~/atoms/NavigationItem";
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
	const navigationItems: NavigationItemProps[] = [
		{
			name: "Looking Glass",
			icon: faAperture,
			href: "/looking-glass",
			active: /\/looking-glass\/?/.test(document.location.pathname),
		},
		{
			name: "Colophon",
			icon: faTrillium,
			href: "/colophon",
			active: /\/colophon\/?/.test(document.location.pathname),
		},
		{
			name: "Design",
			icon: faPenNib,
			href: "https://blocks.nuttyver.se/",
			external: true,
		},
		{
			name: "Code",
			icon: faCode,
			href: "https://code.nuttyver.se/observable/nuttyverse",
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
