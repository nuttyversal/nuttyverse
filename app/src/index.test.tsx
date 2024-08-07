import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "solid-js/web";

// Mock solid-js/web module.
vi.mock("solid-js/web", async (importActual) => {
	return {
		...((await importActual()) as object),
		render: vi.fn(),
	};
});

describe("index.tsx", () => {
	let originalDocument: Document;

	beforeEach(() => {
		// Save the original document.
		originalDocument = global.document;

		// Mock getElementById to return a dummy value.
		global.document = {
			...originalDocument,
			getElementById: vi.fn(),
		};

		// Clear the module cache.
		vi.resetModules();
	});

	afterEach(() => {
		// Restore the original document.
		global.document = originalDocument;

		// Reset the mock to default state.
		vi.resetAllMocks();
	});

	it("should render the app when root element is found", async () => {
		// Mock getElementById to return a dummy value.
		const mockRoot = {} as HTMLElement;
		(document.getElementById as any).mockReturnValue(mockRoot);

		// Import the file under test.
		await import("../src/index");

		// Check if render was called with correct arguments.
		expect(render).toHaveBeenCalledWith(expect.any(Function), mockRoot);
	});

	it("should throw an error when root element is not found", async () => {
		// Mock getElementById to return null.
		(document.getElementById as any).mockReturnValue(null);

		// Expect an error to be thrown when the file is imported
		await expect(import("../src/index")).rejects.toThrow(
			"Root element not found.",
		);
	});
});
