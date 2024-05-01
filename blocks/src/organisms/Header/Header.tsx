import { useEffect } from "react";
import { useThemeSwitcher } from "~/styles/themes/contract";
import { ChibiButton } from "~/molecules/ChibiButton";
import { LogoButton } from "~/molecules/LogoButton";
import { MessageOfTheDay } from "~/molecules/MessageOfTheDay";
import { chibi, container, header, logo } from "./Header.css";

export const Header = () => {
	const { theme, setTheme, toggleTheme } = useThemeSwitcher();

	const resetTheme = () => {
		// When using Astro view transitions, the theme classes applied to the
		// document element get reset. This side effect re-applies the theme
		// classes when the header mounts again.
		if (theme !== "unset") {
			setTheme(theme);
		}
	};

	useEffect(() => {
		document.addEventListener("astro:page-load", resetTheme);

		return () => {
			document.removeEventListener("astro:page-load", resetTheme);
		};
	}, []);

	return (
		<header className={header}>
			<div className={container}>
				<LogoButton className={logo} />
				<ChibiButton className={chibi} onClick={toggleTheme} />
			</div>

			<MessageOfTheDay />
		</header>
	);
};
