import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { Logo } from "./Logo";

describe("Logo component", () => {
	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => <Logo />);

		// Assert.
		expect(container.querySelector("svg")).toBeTruthy();
	});
});
