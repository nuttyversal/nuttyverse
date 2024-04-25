import { spacing } from "~/styles/tokens/spacing";
import { useThemeSwitcher } from "~/styles/themes/contract";
import { Logo } from "~/atoms/Logo";
import { ChibiButton } from "~/molecules/ChibiButton";
import { MessageOfTheDay } from "~/molecules/MessageOfTheDay";
import { chibi, container } from "./Header.css";

export const Header = () => {
	const { toggleTheme } = useThemeSwitcher();

	return (
		<div>
			<div className={container}>
				<Logo style={{ marginBottom: `-${spacing.px}` }} />
				<ChibiButton className={chibi} onClick={toggleTheme} />
			</div>

			<MessageOfTheDay />
		</div>
	);
};
