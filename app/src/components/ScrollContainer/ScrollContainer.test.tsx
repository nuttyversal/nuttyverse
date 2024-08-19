import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { ScrollContainer } from "./ScrollContainer";

describe("ScrollContainer component", () => {
	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => (
			<MockServiceProvider>
				<ScrollContainer />
			</MockServiceProvider>
		));

		// Assert.
		expect(container.querySelector(".nv-scroller")).toBeTruthy();
	});
});
