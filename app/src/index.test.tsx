import fs from "fs";
import path from "path";
import { Effect } from "effect";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { render } from "solid-js/web";
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

// Mock the render function from SolidJS.
vi.mock("solid-js/web", async (importActual) => {
	return {
		...((await importActual()) as object),
		render: vi.fn(),
	};
});

describe("Application startup", () => {
	beforeEach(async () => {
		await Effect.runPromise(setupTestDom);
	});

	it("should render the application", async () => {
		await Effect.runPromise(main);
		expect(render).toHaveBeenCalled();
	});
});
