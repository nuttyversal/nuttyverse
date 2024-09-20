import { Effect } from "effect";
import { useRuntime } from "../context";
import { ThemeService } from "./service";

/**
 * A hook that provides access to the color theme and theme toggling
 * functionality. It hydrates the theme when the hook is first called.
 */
const useTheme = () => {
	const { NuttyverseRuntime } = useRuntime();

	const store = NuttyverseRuntime.runSync(
		Effect.gen(function* () {
			return (yield* ThemeService).store;
		}),
	);

	const toggleTheme = () => {
		return NuttyverseRuntime.runPromise(
			Effect.gen(function* () {
				const themeService = yield* ThemeService;

				yield* themeService.toggleTheme;
			}),
		);
	};

	NuttyverseRuntime.runSync(
		Effect.gen(function* () {
			const themeService = yield* ThemeService;

			if (!themeService.store.hasHydrated) {
				yield* themeService.hydrateTheme;
			}
		}),
	);

	return { store, toggleTheme };
};

export { useTheme };
