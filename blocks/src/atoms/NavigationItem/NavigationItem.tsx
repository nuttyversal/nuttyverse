import classNames from "classnames";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/pro-solid-svg-icons/faArrowUpRightFromSquare";
import { Text } from "~/atoms/Text/Text";
import { active, container, external, icon, link } from "./NavigationItem.css";

export type NavigationItemProps = {
	/**
	 * Specifies the name of the navigation item.
	 */
	name: string;

	/**
	 * Specifies the Font Awesome icon to display in the navigation item.
	 */
	icon: IconDefinition;

	/**
	 * Specifies the link URL of the navigation item.
	 */
	href: string;

	/**
	 * If enabled (`true`), opens the link in a new tab.
	 */
	external?: boolean;

	/**
	 * If enabled (`true`), navigation item will be visually marked as active.
	 */
	active?: boolean;
};

export const NavigationItem: React.FC<NavigationItemProps> = (props) => {
	return (
		<li className={container}>
			<Text
				as="a"
				href={props.href}
				target={props.external ? "_blank" : ""}
				className={classNames({
					[link]: true,
					[active]: props.active,
				})}
				marginless
			>
				<FontAwesomeIcon className={icon} icon={props.icon} />

				{props.name}

				{props.external && (
					<FontAwesomeIcon
						className={classNames(icon, external)}
						icon={faArrowUpRightFromSquare}
					/>
				)}
			</Text>
		</li>
	);
};
