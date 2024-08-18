import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { markdownLanguage } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { EditorView, ViewUpdate, keymap } from "@codemirror/view";
import { vim } from "@replit/codemirror-vim";

import gsap from "gsap";
import { Effect, Option } from "effect";
import {
	Accessor,
	Component,
	createEffect,
	createResource,
	createSignal,
	onCleanup,
	onMount,
	useContext,
} from "solid-js";
import { ScrollContainer } from "~/components/ScrollContainer";
import { useCarmackClick } from "~/components/hooks";
import { ServiceContext } from "~/services/context";
import { LocalStorageService } from "~/services/local-storage";
import styles from "./Editor.module.scss";
import { computeScrollY, SourceMap } from "./auto-scroll";
import { compileMdx } from "./compiler";

const Editor: Component = () => {
	let container!: HTMLDivElement;

	const [scrollContainer, setScrollContainer] =
		createSignal<HTMLDivElement | null>(null);

	const services = useContext(ServiceContext);

	if (!services) {
		throw new Error("Service context is not available.");
	}

	const { localStorageService } = services;

	const [editorView, setEditorView] = createSignal<EditorView | null>(null);
	const [documentContent, setDocumentContent] = createSignal<string>("");
	const [sourceMap, setSourceMap] = createSignal<SourceMap>({});
	const [lineNumber, setLineNumber] = createSignal<number>(1);
	const [isSyncing, setIsSyncing] = createSignal<boolean>(false);

	const toggleSyncing = () => {
		setIsSyncing((prev) => !prev);
	};

	// When the document content changes, compile the MDX content.
	const [mdxContent] = createResource(
		documentContent,
		async (documentContent) => {
			const compileEffect = compileMdx(documentContent, setSourceMap);
			return await Effect.runPromise(compileEffect);
		},
	);

	// When the document is updated, save the content to local storage.
	const saveOnChange = (update: ViewUpdate) => {
		return Effect.runPromise(
			Effect.gen(function* () {
				if (update.docChanged) {
					const documentContent = update.state.doc.toString();
					const localStorage = yield* LocalStorageService;
					yield* localStorage.setItem("editor", documentContent);
					setDocumentContent(documentContent);
				}
			}).pipe(
				Effect.provideService(LocalStorageService, localStorageService),
			),
		);
	};

	const updateLineNumber = (update: ViewUpdate) => {
		// Get the main selection range.
		const range = update.state.selection.main;

		// Get the line number of the selection's head (cursor position).
		const lineNumber = update.state.doc.lineAt(range.head).number;

		setLineNumber(lineNumber);
	};

	// An effect that loads the saved document content from local storage.
	const loadSavedDocument = Effect.gen(function* () {
		// Retrieve the document content from local storage.
		const localStorage = yield* LocalStorageService;
		const maybeDocument = yield* localStorage.getItem("editor");

		// Default to an empty string if the document is not found.
		const documentContent = Option.getOrElse(maybeDocument, () => "");

		setDocumentContent(documentContent);
		return documentContent;
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
					EditorView.updateListener.of(saveOnChange),
					EditorView.updateListener.of(updateLineNumber),
				],
			});

			setEditorView(
				new EditorView({
					state: initialState,
					parent: container,
				}),
			);
		});
	};

	onMount(() => {
		Effect.runPromise(
			Effect.gen(function* () {
				const document = yield* loadSavedDocument;
				yield* setupEditor(document);
			}).pipe(
				Effect.provideService(LocalStorageService, localStorageService),
			),
		);

		const scroller = document.querySelector(".cm-scroller");

		scroller?.addEventListener("scroll", () => {
			if (!isSyncing()) {
				return;
			}

			// Compute the scroll target based on the source map and line number.
			const scrollTarget = computeScrollY(sourceMap(), lineNumber());

			// Query the scroll container.
			const container = document.querySelector(".test-container");

			if (!container) {
				throw new Error("Scroll container not found.");
			}

			// Scroll the container to the target position.
			if (lineNumber() === 1) {
				// Ignore.
			} else if (lineNumber() >= Object.keys(sourceMap()).length) {
				// Ignore.
			} else if (scrollTarget !== 0) {
				gsap.to(container, {
					scrollTop: scrollTarget,
					duration: 0.1,
					ease: "none",
				});
			}
		});
	});

	createEffect(() => {
		if (!isSyncing()) {
			return;
		}

		// Compute the scroll target based on the source map and line number.
		const scrollTarget = computeScrollY(sourceMap(), lineNumber());

		// Query the scroll container.
		const container = document.querySelector(".test-container");

		if (!container) {
			throw new Error("Scroll container not found.");
		}

		// Scroll the container to the target position.
		if (lineNumber() === 1) {
			gsap.to(container, {
				scrollTop: 0,
				duration: 0.1,
				ease: "none",
			});
		} else if (lineNumber() >= Object.keys(sourceMap()).length) {
			gsap.to(container, {
				scrollTop: 9000,
				duration: 0.1,
				ease: "none",
			});
		} else if (scrollTarget !== 0) {
			gsap.to(container, {
				scrollTop: scrollTarget,
				duration: 0.1,
				ease: "none",
			});
		}
	});

	onCleanup(() => {
		const view = editorView();

		if (view) {
			view.destroy();
		}

		// [TODO] Remove event listener.
	});

	return (
		<div class={styles.container}>
			<SyncButton isSyncing={isSyncing} onClick={toggleSyncing} />
			<div class={styles.editor} ref={container} />
			<ScrollContainer ref={setScrollContainer} class={styles.output}>
				<div class={styles.content}>{mdxContent()}</div>
			</ScrollContainer>
		</div>
	);
};

type SyncButtonProps = {
	isSyncing: Accessor<boolean>;
	onClick: () => void;
};

const SyncButton: Component<SyncButtonProps> = (props) => {
	const classes = () => ({
		[styles["sync-button"]]: true,
		[styles.syncing]: props.isSyncing(),
	});

	const { handleMouseDown: onMouseDown, handleClick: onClick } =
		useCarmackClick(props.onClick);

	return (
		<button classList={classes()} onMouseDown={onMouseDown} onClick={onClick}>
			{props.isSyncing() ? "⚡ Sync ⚡" : "Sync"}
		</button>
	);
};

export { Editor };
