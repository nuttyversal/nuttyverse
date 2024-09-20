import { Effect } from "effect";
import { describe, it, expect, vi } from "vitest";
import { NuttyverseLiveRuntime } from "../runtime";
import { Theme, ThemeService } from "./service";

/**
 * Mocks the matchMedia function to return the specified matches value.
 */
const mockMatchMedia = (matches: boolean) => {
	window.matchMedia = (query: string) => ({
		matches,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	});
};

describe("Theme service", () => {
	it("should hydrate with light theme when user prefers light", async () => {
		mockMatchMedia(false);

		await NuttyverseLiveRuntime.runPromise(
			Effect.gen(function* () {
				const themeService = yield* ThemeService;
				yield* themeService.hydrateTheme;
			}),
		);

		expect(document.documentElement.getAttribute("data-theme")).toBe(
			Theme.Light,
		);
	});

	it("should hydrate with dark theme when user prefers dark", async () => {
		// Hydrate with dark theme.
		mockMatchMedia(true);

		await NuttyverseLiveRuntime.runPromise(
			Effect.gen(function* () {
				const themeService = yield* ThemeService;
				yield* themeService.hydrateTheme;

				expect(document.documentElement.getAttribute("data-theme")).toBe(
					Theme.Dark,
				);
			}),
		);
	});

	it("should toggle the theme", async () => {
		// Hydrate with light theme.
		mockMatchMedia(false);

		await NuttyverseLiveRuntime.runPromise(
			Effect.gen(function* () {
				const themeService = yield* ThemeService;
				const initialTheme = themeService.store.theme;

				// Toggle to dark theme.
				yield* themeService.toggleTheme;

				expect(
					document.documentElement.getAttribute("data-theme"),
				).not.toBe(initialTheme);

				// Toggle to light theme.
				yield* themeService.toggleTheme;

				expect(document.documentElement.getAttribute("data-theme")).toBe(
					initialTheme,
				);
			}),
		);
	});
});
