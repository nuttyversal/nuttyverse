import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import {
	darkTheme,
	darkThemeBackground,
	lightTheme,
	lightThemeBackground,
} from "./contract.css";
import classNames from "classnames";

type Theme = "light" | "dark" | "unset";

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
		$theme.set(theme);

		// [NOTE] Assumes that the only class applied to the root element
		// is the class name that indicates the currently applied theme.
		// Any other applied classes will get nuked.
		document.documentElement.className = classNames({
			[darkTheme]: theme === "dark",
			[lightTheme]: theme === "light",
			[darkThemeBackground]: theme === "dark",
			[lightThemeBackground]: theme === "light",
		});
	};

	const toggleTheme = () => {
		if ($theme.get() === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	useEffect(() => {
		if ($theme.get() === "unset") {
			const mediaQuery = "(prefers-color-scheme: dark)";
			const prefersDarkMode = window.matchMedia(mediaQuery);

			if (prefersDarkMode.matches) {
				setTheme("dark");
			} else {
				setTheme("light");
			}
		}
	}, []);

	const resetTheme = () => {
		if ($theme.get() !== "unset") {
			setTheme($theme.get());
		}
	};

	useEffect(() => {
		// When using Astro view transitions, the theme classes applied to the
		// document element get reset. This side effect re-applies the theme
		// classes when the header mounts again.
		document.addEventListener("astro:page-load", resetTheme);
		document.addEventListener("astro:after-swap", resetTheme);

		return () => {
			document.removeEventListener("astro:page-load", resetTheme);
			document.removeEventListener("astro:after-swap", resetTheme);
		};
	}, []);

	return {
		theme,
		setTheme,
		toggleTheme,
	};
};
