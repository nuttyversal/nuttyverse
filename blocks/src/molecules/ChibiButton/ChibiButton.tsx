import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/pro-regular-svg-icons/faMoon";
import { faSun } from "@fortawesome/pro-regular-svg-icons/faSun";
import { useStore } from "@nanostores/react";
import { $theme } from "~/styles/themes/contract";
import { spacing } from "~/styles/tokens/spacing";
import { Chibi } from "~/atoms/Chibi";
import { Tooltip } from "~/atoms/Tooltip";
import { base, tooltip } from "./ChibiButton.css";

type ChibiButtonProps = {
	className?: string;
	onClick: () => void;
};

export const ChibiButton: React.FC<ChibiButtonProps> = (props) => {
	const theme = useStore($theme);
	const [icon, setIcon] = useState<ReactNode>(null);

	useEffect(() => {
		if (theme === "dark") {
			setIcon(
				<FontAwesomeIcon style={{ height: spacing[4] }} icon={faMoon} />,
			);
		} else {
			setIcon(
				<FontAwesomeIcon style={{ height: spacing[4] }} icon={faSun} />,
			);
		}
	}, [theme]);

	return (
		<Tooltip
			className={tooltip}
			content={{
				type: "element",
				element: icon,
			}}
		>
			<button
				onClick={props.onClick}
				aria-label="Toggle dark mode"
				className={classNames(props.className, base)}
			>
				<Chibi className={props.className} />
			</button>
		</Tooltip>
	);
};
