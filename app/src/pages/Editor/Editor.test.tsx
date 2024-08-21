import { describe, it, expect } from "vitest";
import { Route } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { ScrollLayout } from "~/components/ScrollLayout";
import { ServiceProvider } from "~/services/context";
import { Editor } from "./Editor";

describe("Editor page", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<ServiceProvider>
				<ScrollLayout>
					<Editor />
				</ScrollLayout>
			</ServiceProvider>
		);

		const { findByTestId } = render(
			() => <Route path="/" component={App} />,
			{ location: "/" },
		);

		// Assert.
		expect(await findByTestId("editor")).toBeInTheDocument();
	});
});
