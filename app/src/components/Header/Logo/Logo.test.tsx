import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { Logo } from "./Logo";
import { Route } from "@solidjs/router";

describe("Logo component", () => {
	it("throws an error when rendered outside of a service provider", () => {
		// Arrange & Assert.
		expect(() => render(() => <Logo />)).toThrowError();
	});

	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<MockServiceProvider>
				<Logo />
			</MockServiceProvider>
		);

		const { findByTestId } = render(
			() => <Route path="/" component={App} />,
			{ location: "/" },
		);

		// Assert.
		expect(await findByTestId("logo")).toBeTruthy();
	});
});
