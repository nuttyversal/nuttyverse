import { describe, it, expect } from "vitest";
import { Route } from "@solidjs/router";
import { fireEvent, render, waitFor } from "@solidjs/testing-library";
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

	it("can toggle syncing", async () => {
		// Arrange.
		const App = () => (
			<ServiceProvider>
				<ScrollLayout>
					<Editor />
				</ScrollLayout>
			</ServiceProvider>
		);

		const { findByLabelText, container } = render(
			() => <Route path="/" component={App} />,
			{ location: "/" },
		);

		// Act.
		const button = await findByLabelText("Toggle syncing");
		fireEvent.click(button);

		// Assert.
		await waitFor(async () => {
			expect(container.innerHTML.toString().includes("Sync")).toBe(true);
		});
	});
});
