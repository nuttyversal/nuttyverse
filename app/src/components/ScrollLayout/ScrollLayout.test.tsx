import { describe, it, expect } from "vitest";
import { Route } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { ScrollLayout } from "./ScrollLayout";

describe("ScrollLayout component", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<MockServiceProvider>
				<ScrollLayout>Page content goes here.</ScrollLayout>
			</MockServiceProvider>
		);

		const { findByText } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		const content = await findByText("Page content goes here.");
		expect(content).toBeInTheDocument();
	});
});
