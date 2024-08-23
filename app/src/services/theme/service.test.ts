import { Effect } from "effect";
import { describe, it, expect, vi } from "vitest";
import { createThemeService } from "./service";

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
		await Effect.runPromise(createThemeService().hydrateTheme);
		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
	});

	it("should hydrate with dark theme when user prefers dark", async () => {
		mockMatchMedia(true);
		await Effect.runPromise(createThemeService().hydrateTheme);
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
	});

	it("should toggle the theme", async () => {
		// Hydrate with light theme.
		mockMatchMedia(false);
		await Effect.runPromise(createThemeService().hydrateTheme);

		// Toggle to dark theme.
		await Effect.runPromise(createThemeService().toggleTheme);
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

		// Toggle to light theme.
		await Effect.runPromise(createThemeService().toggleTheme);
		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
	});
});
