import { Effect, Context } from "effect";
import { Accessor, createMemo, createSignal } from "solid-js";
import { Theme, setThemeStore, themeStore } from "./store";

/**
 * A service that manages the color theme of the application.
 */
class ThemeService extends Context.Tag("ThemeService")<
	ThemeService,
	{
		readonly theme: Accessor<Theme>;
		readonly hasHydrated: Accessor<boolean>;
		readonly hydrateTheme: Effect.Effect<Theme>;
		readonly toggleTheme: Effect.Effect<Theme>;
	}
>() {}

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
				return setThemeStore({
					...themeStore,
					theme: newTheme,
				});
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

		yield* Effect.sync(() => {
			setThemeStore({
				...themeStore,
				hasHydrated: true,
			});
		});

		return newTheme;
	});

	const toggleTheme = Effect.gen(function* () {
		let newTheme: Theme;

		if (themeStore.theme === Theme.Light) {
			newTheme = Theme.Dark;
		} else {
			newTheme = Theme.Light;
		}

		yield* updateTheme(newTheme);

		return newTheme;
	});

	return {
		theme: createMemo(() => themeStore.theme),
		hasHydrated: createMemo(() => themeStore.hasHydrated),
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
	const [hasHydrated, setHasHydrated] = createSignal<boolean>(false);

	const hydrateTheme = Effect.sync(() => {
		setTheme(Theme.Light);
		setHasHydrated(true);
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
		hasHydrated,
		hydrateTheme,
		toggleTheme,
	};
}

export { Theme, ThemeService, createThemeService, createMockThemeService };
