import { Effect } from "effect";
import { Route } from "@solidjs/router";
import { render, waitFor } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { MockServiceProvider } from "~/services/context";
import { createMockLocalStorageService } from "~/services/local-storage";
import { Editor } from "./Editor";

describe("Editor component", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<MockServiceProvider>
				<Editor />
			</MockServiceProvider>
		);

		const { findByTestId } = render(
			() => <Route path="/" component={App} />,
			{ location: "/" },
		);

		// Assert.
		expect(await findByTestId("editor")).toBeInTheDocument();
	});

	it("hydrates the document content from local storage", async () => {
		// Arrange.
		const documentContent = "Hello, world!";
		const localStorageService = createMockLocalStorageService();

		Effect.runSync(localStorageService.setItem("editor", documentContent));

		const App = () => (
			<MockServiceProvider serviceOverrides={{ localStorageService }}>
				<Editor />
			</MockServiceProvider>
		);

		const { findByText } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		const content = await findByText(documentContent);
		expect(content).toBeInTheDocument();
	});

	it("enables syncing by default", async () => {
		const documentContent = "Hello, world!\n\nAn empty block exists!";
		const localStorageService = createMockLocalStorageService();

		Effect.runSync(localStorageService.setItem("editor", documentContent));

		const App = () => (
			<MockServiceProvider serviceOverrides={{ localStorageService }}>
				<Editor />
			</MockServiceProvider>
		);

		const { findByText } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		expect(await findByText("⚡ Sync ⚡")).toBeInTheDocument();
	});
});
