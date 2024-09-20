import { describe, it, expect } from "vitest";
import { Route } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { RuntimeTestProvider } from "~/services/context";
import { ScrollLayout } from "../ScrollLayout";

describe("ScrollContainer component", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<RuntimeTestProvider>
				<ScrollLayout>Page content goes here.</ScrollLayout>
			</RuntimeTestProvider>
		);

		const { findByText } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		const content = await findByText("Page content goes here.");
		expect(content).toBeInTheDocument();
	});
});
