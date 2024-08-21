import { describe, it, expect } from "vitest";
import { Route } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { Header } from "./Header";

describe("Header component", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<MockServiceProvider>
				<Header />
			</MockServiceProvider>
		);

		const { findByTestId } = render(
			() => <Route path="/" component={App} />,
			{ location: "/" },
		);

		// Assert.
		expect(await findByTestId("header")).toBeInTheDocument();
	});
});
