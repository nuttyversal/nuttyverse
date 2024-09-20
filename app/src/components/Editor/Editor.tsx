import { Effect, Option } from "effect";
import {
	Accessor,
	Component,
	createEffect,
	createResource,
	createSignal,
	onMount,
	on,
	useContext,
} from "solid-js";
import { ScrollContainer } from "~/components/ScrollContainer";
import { useCarmackClick } from "~/components/hooks";
import { ServiceContext } from "~/services/context";
import { LocalStorageService } from "~/services/local-storage";
import styles from "./Editor.module.scss";
import { compileMarkdownJsx } from "./compiler/compile";
import { useEditor } from "./editor/hook";
import { useScrollSyncing } from "./sync/hook";
import { SourceMap } from "./sync/types";

const Editor: Component = () => {
	const Context = useContext(ServiceContext);

	if (!Context) {
		throw new Error("NuttyverseRuntime is not provided");
	}

	const NuttyverseRuntime = Context.NuttyverseRuntime;

	const [sourceMap, setSourceMap] = createSignal<SourceMap>({});

	const {
		setEditorContainer,
		setupEditor,
		documentContent,
		currentLineNumber,
	} = useEditor();

	const { setupScrollSyncing, isSyncing, toggleSyncing } = useScrollSyncing(
		sourceMap,
		currentLineNumber,
	);

	// When the document content changes, compile the MDX content.
	const [mdxContent] = createResource(
		documentContent,
		async (documentContent) => {
			return await Effect.runPromise(
				compileMarkdownJsx(documentContent, setSourceMap),
			);
		},
	);

	// When the document is updated, save the content to local storage.
	// This effect is deferred to prevent it from running on mount,
	// which would overwrite the saved content in local storage before
	// it can be loaded.
	createEffect(
		on(
			documentContent,
			(documentContent) => {
				NuttyverseRuntime.runPromise(
					Effect.gen(function* () {
						const localStorage = yield* LocalStorageService;
						yield* localStorage.setItem("editor", documentContent);
					}),
				);
			},
			{ defer: true },
		),
	);

	// An effect that loads the saved document content from local storage.
	const loadSavedDocument = Effect.gen(function* () {
		const localStorage = yield* LocalStorageService;
		const maybeDocument = yield* localStorage.getItem("editor");
		return Option.getOrElse(maybeDocument, () => "");
	});

	onMount(() => {
		NuttyverseRuntime.runPromise(
			Effect.gen(function* () {
				const document = yield* loadSavedDocument;
				yield* setupEditor(document);
				yield* setupScrollSyncing;
			}),
		);
	});

	return (
		<div class={styles.container} data-testid="editor">
			<SyncButton isSyncing={isSyncing} onClick={toggleSyncing} />
			<div class={styles.editor} ref={setEditorContainer} />
			<ScrollContainer class={styles.output}>
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
		<button
			classList={classes()}
			onMouseDown={onMouseDown}
			onClick={onClick}
			aria-label="Toggle syncing"
		>
			{props.isSyncing() ? "⚡ Sync ⚡" : "Sync"}
		</button>
	);
};

export { Editor };
