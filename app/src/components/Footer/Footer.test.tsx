import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { Footer } from "./Footer";

describe("Footer component", () => {
	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => <Footer />);

		// Assert.
		expect(container.querySelector("footer")).toBeTruthy();
	});
});
