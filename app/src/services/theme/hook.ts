import { Effect } from "effect";
import { useContext } from "solid-js";
import { ServiceContext } from "../context";

/**
 * A hook that provides access to the color theme and theme toggling
 * functionality. It hydrates the theme when the hook is first called.
 */
const useTheme = () => {
	const services = useContext(ServiceContext);

	if (!services) {
		throw new Error("Service context is not available.");
	}

	const { themeService } = services;

	const theme = themeService.theme;

	const hydrateTheme = () => {
		Effect.runPromise(themeService.hydrateTheme)
			.then((theme) => {
				console.log(`Hydrated theme (${theme}) from user settings.`);
			})
			.catch((error) => {
				console.error(`Failed to hydrate theme: ${error}.`);
			});
	};

	const toggleTheme = () => {
		Effect.runPromise(themeService.toggleTheme)
			.then((newTheme) => {
				console.log(`Toggled theme to ${newTheme}.`);
			})
			.catch((error) => {
				console.error(`Failed to toggle theme: ${error}.`);
			});
	};

	if (!themeService.hasHydrated()) {
		hydrateTheme();
	}

	return { theme, toggleTheme };
};

export { useTheme };
