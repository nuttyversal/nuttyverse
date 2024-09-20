import { Route } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { RuntimeTestProvider } from "~/services/context";
import { NuttyverseTestRuntime } from "~/services/runtime";
import { LocalStorageService } from "~/services/local-storage";
import { Editor } from "./Editor";

describe("Editor component", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<RuntimeTestProvider>
				<Editor />
			</RuntimeTestProvider>
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

		NuttyverseTestRuntime.runSync(
			Effect.gen(function* () {
				const localStorageService = yield* LocalStorageService;
				yield* localStorageService.setItem("editor", documentContent);
			}),
		);

		const App = () => (
			<RuntimeTestProvider>
				<Editor />
			</RuntimeTestProvider>
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

		NuttyverseTestRuntime.runSync(
			Effect.gen(function* () {
				const localStorageService = yield* LocalStorageService;
				yield* localStorageService.setItem("editor", documentContent);
			}),
		);

		const App = () => (
			<RuntimeTestProvider>
				<Editor />
			</RuntimeTestProvider>
		);

		const { findByText } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		expect(await findByText("⚡ Sync ⚡")).toBeInTheDocument();
	});
});
