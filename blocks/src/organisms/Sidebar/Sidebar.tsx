import { faCode } from "@fortawesome/pro-solid-svg-icons/faCode";
import { faGalaxy } from "@fortawesome/pro-solid-svg-icons/faGalaxy";
import { faPenNib } from "@fortawesome/pro-solid-svg-icons/faPenNib";
import { faUser } from "@fortawesome/pro-solid-svg-icons/faUser";
import { NavigationItemList } from "~/molecules/NavigationItemList";
import { TootBubble } from "~/molecules/TootBubble";
import { container } from "./Sidebar.css";

export const Sidebar: React.FC = () => {
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
		<div className={container}>
			<NavigationItemList items={navigationItems} />
		</div>
	);
};
