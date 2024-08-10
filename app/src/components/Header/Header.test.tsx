import { describe, it, expect, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
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

vi.mock("@solidjs/router", (importActual) => {
	const navigate = vi.fn();

	return {
		...importActual,
		useNavigate: () => navigate,
	};
});

describe("Header component", () => {
	it("renders without crashing", () => {
		// Arrange.
		mockMatchMedia(false);
		const { container } = render(() => (
			<MockServiceProvider>
				<Header />
			</MockServiceProvider>
		));

		// Assert.
		expect(container.querySelector("header")).toBeTruthy();
	});
});
