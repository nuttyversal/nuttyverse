import { Effect, Context, Layer } from "effect";
import { Store } from "solid-js/store";
import { Theme, ThemeStore, createThemeStore } from "./store";

/**
 * A service that manages the color theme of the application.
 * It is responsible for hydrating the theme based on the user's
 * operating system setting and toggling the theme.
 */
class ThemeService extends Context.Tag("ThemeService")<
	ThemeService,
	{
		readonly store: Store<ThemeStore>;
		readonly hydrateTheme: Effect.Effect<Theme>;
		readonly toggleTheme: Effect.Effect<Theme>;
	}
>() {}

const ThemeLive = Layer.effect(
	ThemeService,
	Effect.gen(function* () {
		const [store, setStore] = createThemeStore();

		const updateTheme = (newTheme: Theme) => {
			return Effect.sync(() => {
				// Set the theme on the root element.
				document.documentElement.setAttribute("data-theme", newTheme);
			}).pipe(
				Effect.map(() => {
					return setStore("theme", newTheme);
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
				setStore("hasHydrated", true);
			});

			return newTheme;
		});

		const toggleTheme = Effect.gen(function* () {
			let newTheme: Theme;

			if (store.theme === Theme.Light) {
				newTheme = Theme.Dark;
			} else {
				newTheme = Theme.Light;
			}

			yield* updateTheme(newTheme);

			return newTheme;
		});

		return {
			store,
			hydrateTheme,
			toggleTheme,
		};
	}),
);

const ThemeTest = Layer.effect(
	ThemeService,
	Effect.gen(function* () {
		const [store, setStore] = createThemeStore();

		const hydrateTheme = Effect.sync(() => {
			setStore("theme", Theme.Light);
			setStore("hasHydrated", true);

			return Theme.Light;
		});

		const toggleTheme = Effect.sync(() => {
			let newTheme: Theme;

			if (store.theme === Theme.Light) {
				newTheme = Theme.Dark;
			} else {
				newTheme = Theme.Light;
			}

			setStore("theme", newTheme);

			return newTheme;
		});

		return {
			store,
			hydrateTheme,
			toggleTheme,
		};
	}),
);

export { Theme, ThemeService, ThemeLive, ThemeTest };
