import { describe, it, expect, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import { Header } from "./Header";

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

describe("Header component", () => {
	it("renders without crashing", () => {
		// Arrange.
		mockMatchMedia(false);
		const { container } = render(() => <Header />);

		// Assert.
		expect(container.querySelector("header")).toBeTruthy();
	});
});
