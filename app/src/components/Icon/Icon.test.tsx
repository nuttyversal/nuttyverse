import { describe, expect, it } from "vitest";
import { render } from "@solidjs/testing-library";
import { Icon } from "./Icon";

describe("Icon component", () => {
	it("renders an icon", () => {
		// Arrange.
		const { container } = render(() => <Icon name="sparkle" />);

		// Assert.
		expect(container.innerHTML).toContain("svg");
		expect(container.innerHTML.includes("sparkle")).toBe(true);
	});

	it("renders a fallback icon (bug) when icon is not found", () => {
		// Arrange.
		const { container } = render(() => <Icon name="tilde" />);

		// Assert.
		expect(container.innerHTML).toContain("svg");
		expect(container.innerHTML.includes("tilde")).toBe(false);
		expect(container.innerHTML.includes("bug")).toBe(true);
	});
});
