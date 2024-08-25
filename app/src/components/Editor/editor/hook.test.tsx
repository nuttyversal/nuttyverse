import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { useEditor } from "./hook";
import { EditorRefNotBoundError } from "./errors";
import { render, waitFor } from "@solidjs/testing-library";
import { Route } from "@solidjs/router";

describe("useEditor hook", () => {
	it("should throw an error if the editor container is not bound", () => {
		// Arrange.
		const { setupEditor } = useEditor();

		// Act.
		const voidOrError = Effect.runSync(
			setupEditor("Hello, world!").pipe(Effect.catchAll(Effect.succeed)),
		);

		// Arrange.
		expect(voidOrError).toBeInstanceOf(EditorRefNotBoundError);
	});

	it("should track the current line number", async () => {
		// Arrange.
		const documentContent =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n" +
			"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

		const { setEditorContainer, setupEditor, editorView, currentLineNumber } =
			useEditor();

		const App = () => <div data-testid="editor" ref={setEditorContainer} />;

		const { findByTestId } = render(
			() => <Route path="/" component={App} />,
			{ location: "/" },
		);

		// Wait for mount before setting up the editor.
		await findByTestId("editor");

		Effect.runSync(setupEditor(documentContent));

		// Act.
		const targetLineNumber = 2;
		const editor = editorView();

		if (!editor) {
			throw new Error("Editor view not found.");
		}

		const line = editor.state.doc.line(targetLineNumber);

		editor.dispatch({
			selection: { head: line.from, anchor: line.to },
		});

		// Assert.
		expect(currentLineNumber()).toBe(targetLineNumber);
	});
});
