import { spacing } from "~/styles/tokens/spacing";
import { useThemeSwitcher } from "~/styles/themes/contract";
import { Logo } from "~/atoms/Logo";
import { ChibiButton } from "~/molecules/ChibiButton";
import { MessageOfTheDay } from "~/molecules/MessageOfTheDay";
import { chibi, container, header, logo } from "./Header.css";

export const Header = () => {
	const { toggleTheme } = useThemeSwitcher();

	return (
		<header className={header}>
			<div className={container}>
				<Logo className={logo} />
				<ChibiButton className={chibi} onClick={toggleTheme} />
			</div>

			<MessageOfTheDay />
		</header>
	);
};
