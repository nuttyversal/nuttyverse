import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { ServiceProvider } from "~/services/context";
import { ScrollContainer } from "./ScrollContainer";

describe("ScrollContainer component", () => {
	it("throws an error when rendered outside of a service provider", () => {
		// Arrange & Assert.
		expect(() => render(() => <ScrollContainer />)).toThrowError();
	});

	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => (
			<ServiceProvider>
				<ScrollContainer />
			</ServiceProvider>
		));

		// Assert.
		expect(container.querySelector(".nv-scroller")).toBeTruthy();
	});
});
