import { describe, it, expect, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { ScrollLayout } from "./ScrollLayout";

vi.mock("@solidjs/router", (importActual) => {
	return {
		...importActual,
		useNavigate: () => vi.fn(),
		useIsRouting: () => vi.fn(),
		useBeforeLeave: () => vi.fn(),
	};
});

describe("ScrollLayout component", () => {
	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => (
			<MockServiceProvider>
				<ScrollLayout>Page content goes here.</ScrollLayout>
			</MockServiceProvider>
		));

		// Assert.
		const main = container.querySelector("main");
		expect(main && main.textContent).toBe("Page content goes here.");
	});
});
