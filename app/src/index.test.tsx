import fs from "fs";
import path from "path";
import { Effect } from "effect";
import { beforeEach, describe, it, vi } from "vitest";
import { main } from "./index";

/**
 * An effect that sets up the test DOM by reading the index.html file
 * and setting its contents as the body of the document.
 */
const setupTestDom = Effect.try({
	try: () => {
		document.body.innerHTML = fs
			.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8")
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

describe("Application startup", () => {
	beforeEach(async () => {
		await Effect.runPromise(setupTestDom);
	});

	it("renders without crashing", async () => {
		mockMatchMedia(false);
		await Effect.runPromise(main);
	});
});
