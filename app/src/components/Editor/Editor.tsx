import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { markdownLanguage } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { EditorView, ViewUpdate, keymap } from "@codemirror/view";
import { vim } from "@replit/codemirror-vim";

import "katex/dist/katex.css";

import { Effect, Option } from "effect";
import { Component, createSignal, JSX, onMount, useContext } from "solid-js";
import { ServiceContext } from "~/services/context";
import { LocalStorageService } from "~/services/local-storage";
import styles from "./Editor.module.scss";
import { compileMdx } from "./compiler";

const Editor: Component = () => {
	let container!: HTMLDivElement;

	const [mdxContent, setMdxContent] = createSignal<JSX.Element | null>(null);

	const services = useContext(ServiceContext);

	if (!services) {
		throw new Error("Service context is not available.");
	}

	const { localStorageService } = services;

	// When the document changes, save the content to local storage.
	// Then compile the content into JSX and update the output.
	const compileWhenChanged = (update: ViewUpdate) => {
		return Effect.runPromise(
			Effect.gen(function* () {
				if (update.docChanged) {
					// Get the document content.
					const documentContent = update.state.doc.toString();

					// Save the document content to local storage.
					const localStorage = yield* LocalStorageService;
					yield* localStorage.setItem("editor", documentContent);

					// Compile the document content into JSX.
					const content = yield* compileMdx(documentContent);
					setMdxContent(content);
				}
			}).pipe(
				Effect.provideService(LocalStorageService, localStorageService),
			),
		);
	};

	// An effect that loads the saved document content from local storage.
	const loadSavedDocument = Effect.gen(function* () {
		// Retrieve the document content from local storage.
		const localStorage = yield* LocalStorageService;
		const maybeDocument = yield* localStorage.getItem("editor");

		// Default to an empty string if the document is not found.
		return Option.getOrElse(maybeDocument, () => "");
	});

	// An effect that sets up the CodeMirror editor with custom config,
	// extensions, and initial document content.
	const setupEditor = (initialDocument: string) => {
		return Effect.sync(() => {
			const initialState = EditorState.create({
				doc: initialDocument,
				extensions: [
					vim(),
					basicSetup,

					// Use tab indentation.
					indentUnit.of("\t"),
					EditorState.tabSize.of(3),
					keymap.of([indentWithTab]),

					// Compile MDX.
					markdownLanguage,
					EditorView.updateListener.of(compileWhenChanged),
				],
			});

			new EditorView({
				state: initialState,
				parent: container,
			});
		});
	};

	onMount(() => {
		Effect.runPromise(
			Effect.gen(function* () {
				// Load the saved document content from local storage.
				const document = yield* loadSavedDocument;

				// Set up the CodeMirror editor.
				yield* setupEditor(document);

				// Compile the document content into JSX.
				const content = yield* compileMdx(document);
				setMdxContent(content);
			}).pipe(
				Effect.provideService(LocalStorageService, localStorageService),
			),
		);
	});

	return (
		<div class={styles.container}>
			<div class={styles.editor} ref={container}></div>
			<div class={styles.output}>
				<div class={styles.content}>{mdxContent()}</div>
			</div>
		</div>
	);
};

export { Editor };
