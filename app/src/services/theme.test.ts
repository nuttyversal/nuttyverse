import fs from "fs";
import path from "path";
import { Effect } from "effect";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { createThemeService } from "./theme";

/**
 * An effect that sets up the test DOM by reading the index.html file
 * and setting its contents as the body of the document.
 */
const setupTestDom = Effect.try({
	try: () => {
		document.body.innerHTML = fs
			.readFileSync(path.resolve(__dirname, "../../index.html"), "utf-8")
			.toString();
	},
	catch: (error) => {
		new Error(`Failed to set up test DOM: ${error}`);
	},
});

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
	beforeEach(async () => {
		await Effect.runPromise(setupTestDom);
	});

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
