import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { markdownLanguage } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, ViewUpdate } from "@codemirror/view";
import { vim } from "@replit/codemirror-vim";
import { Effect } from "effect";
import { createSignal, onCleanup } from "solid-js";
import { EditorRefNotBoundError } from "./errors";

const useEditor = () => {
	// Stores a reference to the editor container that the editor will be mounted to.
	const [editorContainer, setEditorContainer] =
		createSignal<HTMLDivElement | null>(null);

	// Stores a reference to the editor view.
	const [editorView, setEditorView] = createSignal<EditorView | null>(null);

	// Stores the current document content.
	const [documentContent, setDocumentContent] = createSignal<string>("");

	// Stores the current line number.
	const [currentLineNumber, setCurrentLineNumber] = createSignal<number>(1);

	// Event listener that tracks the document content.
	const trackDocumentContent = EditorView.updateListener.of(
		(update: ViewUpdate) => {
			if (update.docChanged) {
				setDocumentContent(update.state.doc.toString());
			}
		},
	);

	// Event listener that maintains a reference to the current line number.
	const trackCurrentLineNumber = EditorView.updateListener.of(
		(update: ViewUpdate) => {
			// Get the main selection range.
			const range = update.state.selection.main;

			// Get the line number of the selection's head (cursor position).
			const lineNumber = update.state.doc.lineAt(range.head).number;

			setCurrentLineNumber(lineNumber);
		},
	);

	// Indent with tabs. Tabs are three spaces.
	const opinionatedWhitespaceSetup = [
		indentUnit.of("\t"),
		EditorState.tabSize.of(3),
		keymap.of([indentWithTab]),
	];

	// Set up the editor with initial document content.
	const setupEditor = (initialDocument: string) => {
		return Effect.try({
			try: () => {
				const container = editorContainer();

				if (!container) {
					throw new EditorRefNotBoundError();
				}

				const initialState = EditorState.create({
					doc: initialDocument,
					extensions: [
						vim(),
						basicSetup,
						opinionatedWhitespaceSetup,
						trackCurrentLineNumber,
						trackDocumentContent,
						markdownLanguage,
					],
				});

				setDocumentContent(initialDocument);

				setEditorView(
					new EditorView({
						state: initialState,
						parent: container,
					}),
				);
			},
			catch: () => {
				return new EditorRefNotBoundError();
			},
		});
	};

	onCleanup(() => {
		const view = editorView();

		if (view) {
			view.destroy();
			setEditorView(null);
		}
	});

	return {
		setEditorContainer,
		setupEditor,
		editorView,
		documentContent,
		currentLineNumber,
	};
};

export { useEditor };
