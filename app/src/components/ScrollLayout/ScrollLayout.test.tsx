import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { ScrollLayout } from "./ScrollLayout";

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
