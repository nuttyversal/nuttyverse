import { createStore } from "solid-js/store";

/**
 * A color theme that can be applied to the application.
 */
const enum Theme {
	/**
	 * Light mode.
	 */
	Light = "light",

	/**
	 * Dark mode.
	 */
	Dark = "dark",
}

type ThemeStore = {
	/**
	 * Indicates whether the color theme has been hydrated.
	 * The theme is hydrated once when the application starts.
	 */
	hasHydrated: boolean;

	/**
	 * The currently applied color theme.
	 */
	theme: Theme;
};

const createThemeStore = () => {
	return createStore<ThemeStore>({
		hasHydrated: false,
		theme: Theme.Light,
	});
};

export { Theme, ThemeStore, createThemeStore };
