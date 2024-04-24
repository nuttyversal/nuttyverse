import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { darkTheme, lightTheme } from "./contract.css";

type Theme = typeof lightTheme | typeof darkTheme | "unset";

export const $theme = atom<Theme>("unset");

/**
 * A React hook that exposes a smol API for managing the currently selected
 * theme (light mode or dark mode). If there is no selected theme at the time
 * that a component is mounted, then a default theme will be selected based
 * on system preference.
 */
export const useThemeSwitcher = () => {
	const theme = useStore($theme);

	const setTheme = (theme: Theme) => {
		// [NOTE] Assumes that the only class applied to the root element
		// is the class name that indicates the currently applied theme.
		// Any other applied classes will get nuked.
		document.documentElement.className = theme;
		$theme.set(theme);
	};

	const toggleTheme = () => {
		setTheme($theme.get() === lightTheme ? darkTheme : lightTheme);
	};

	useEffect(() => {
		if ($theme.get() === "unset") {
			const mediaQuery = "(prefers-color-scheme: dark)";
			const prefersDarkMode = window.matchMedia(mediaQuery);
			setTheme(prefersDarkMode.matches ? darkTheme : lightTheme);
		}
	}, []);

	return {
		theme,
		setTheme,
		toggleTheme,
	};
};
