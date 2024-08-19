import { Effect, Context } from "effect";
import { Accessor, createSignal } from "solid-js";

/**
 * A color theme that can be applied to the application.
 */
const enum Theme {
	Light = "light",
	Dark = "dark",
}

/**
 * A service that manages the color theme of the application.
 */
class ThemeService extends Context.Tag("ThemeService")<
	ThemeService,
	{
		readonly theme: Accessor<Theme>;
		readonly hydrateTheme: Effect.Effect<Theme>;
		readonly toggleTheme: Effect.Effect<Theme>;
	}
>() {}

/**
 * A singleton signal that represents the currently applied color theme.
 */
const [theme, setTheme] = createSignal<Theme>(Theme.Light);

/**
 * Indicates whether the color theme has been hydrated.
 * We only want to hydrate the theme once when the application starts.
 */
const [hydrated, setHydrated] = createSignal<boolean>(false);

/**
 * A service that manages the color theme of the application.
 * It is responsible for hydrating the theme based on the user's
 * operating system setting and toggling the theme.
 */
function createThemeService(): Context.Tag.Service<ThemeService> {
	const updateTheme = (newTheme: Theme) => {
		return Effect.sync(() => {
			// Set the theme on the root element.
			document.documentElement.setAttribute("data-theme", newTheme);
		}).pipe(
			Effect.map(() => {
				// Update the theme signal.
				return setTheme(newTheme);
			}),
		);
	};

	const hydrateTheme = Effect.gen(function* () {
		// Check operating system setting.
		const prefersDark = yield* Effect.sync(
			() => window.matchMedia("(prefers-color-scheme: dark)").matches,
		);

		let newTheme: Theme;

		if (prefersDark) {
			newTheme = Theme.Dark;
		} else {
			newTheme = Theme.Light;
		}

		// Update the theme.
		yield* updateTheme(newTheme);
		yield* Effect.sync(() => setHydrated(true));

		return newTheme;
	});

	const toggleTheme = Effect.gen(function* () {
		let newTheme: Theme;

		if (theme() === Theme.Light) {
			newTheme = Theme.Dark;
		} else {
			newTheme = Theme.Light;
		}

		yield* updateTheme(newTheme);

		return newTheme;
	});

	return {
		theme,
		hydrateTheme,
		toggleTheme,
	};
}

/**
 * A mock service that represents the currently applied color theme.
 * Intended to be used for testing purposes.
 */
function createMockThemeService(): Context.Tag.Service<ThemeService> {
	const [theme, setTheme] = createSignal<Theme>(Theme.Light);

	const hydrateTheme = Effect.sync(() => {
		setTheme(Theme.Light);
		return Theme.Light;
	});

	const toggleTheme = Effect.sync(() => {
		let newTheme: Theme;

		if (theme() === Theme.Light) {
			newTheme = Theme.Dark;
		} else {
			newTheme = Theme.Light;
		}

		return setTheme(newTheme);
	});

	return {
		theme,
		hydrateTheme,
		toggleTheme,
	};
}

/**
 * A hook that provides access to the color theme and theme toggling
 * functionality. It hydrates the theme when the hook is first called.
 */
const useTheme = (implementation: Context.Tag.Service<ThemeService>) => {
	const theme = implementation.theme;

	const hydrateTheme = () => {
		Effect.runPromise(implementation.hydrateTheme)
			.then((theme) => {
				console.log(`Hydrated theme (${theme}) from user settings.`);
			})
			.catch((error) => {
				console.error(`Failed to hydrate theme: ${error}.`);
			});
	};

	const toggleTheme = () => {
		Effect.runPromise(implementation.toggleTheme)
			.then((newTheme) => {
				console.log(`Toggled theme to ${newTheme}.`);
			})
			.catch((error) => {
				console.error(`Failed to toggle theme: ${error}.`);
			});
	};

	if (!hydrated()) {
		hydrateTheme();
	}

	return { theme, toggleTheme };
};

export {
	Theme,
	ThemeService,
	createThemeService,
	createMockThemeService,
	useTheme,
};
