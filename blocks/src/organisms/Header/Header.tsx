import { useThemeSwitcher } from "~/styles/themes/contract";
import { ChibiButton } from "~/molecules/ChibiButton";
import { LogoButton } from "~/molecules/LogoButton";
import { MessageOfTheDay } from "~/molecules/MessageOfTheDay";
import { chibi, container, header, logo } from "./Header.css";

export const Header = () => {
	const { toggleTheme } = useThemeSwitcher();

	const navigateToSingularity = () => {
		document.location.replace("/");
	};

	return (
		<header className={header}>
			<div className={container}>
				<LogoButton className={logo} onClick={navigateToSingularity} />
				<ChibiButton className={chibi} onClick={toggleTheme} />
			</div>

			<MessageOfTheDay />
		</header>
	);
};
