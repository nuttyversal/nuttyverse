import { describe, it, expect, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { Logo } from "./Logo";

vi.mock("@solidjs/router", (importActual) => {
	const navigate = vi.fn();

	return {
		...importActual,
		useNavigate: () => navigate,
	};
});

describe("Logo component", () => {
	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => (
			<MockServiceProvider>
				<Logo />
			</MockServiceProvider>
		));

		// Assert.
		expect(container.querySelector("svg")).toBeTruthy();
	});
});
