import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { markdownLanguage } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { EditorView, ViewUpdate, keymap } from "@codemirror/view";
import { vim } from "@replit/codemirror-vim";

import { evaluate } from "@mdx-js/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.css";

import { Component, createSignal, onMount } from "solid-js";
import * as runtime from "solid-js/h/jsx-runtime";
import styles from "./Editor.module.scss";

const Editor: Component = () => {
	let container!: HTMLDivElement;

	const [mdxContent, setMdxContent] = createSignal<Element | null>(null);

	const compileMdx = async (mdx: string) => {
		try {
			const { default: renderContent } = await evaluate(mdx, {
				...runtime,
				rehypePlugins: [rehypeKatex],
				remarkPlugins: [remarkMath],
			});

			let Content = renderContent({
				components: {},
			});

			setMdxContent(Content);
		} catch (e) {
			console.error("Failed to compile MDX:", e);
		}
	};

	const compileWhenChanged = (update: ViewUpdate) => {
		if (update.docChanged) {
			localStorage.setItem("editor", update.state.doc.toString());
			compileMdx(update.state.doc.toString());
		}
	};

	const loadSavedDocument = () => {
		return localStorage.getItem("editor") ?? "";
	};

	const initialState = EditorState.create({
		doc: loadSavedDocument(),
		extensions: [
			vim(),
			basicSetup,

			// Tab indentation.
			indentUnit.of("\t"),
			EditorState.tabSize.of(3),
			keymap.of([indentWithTab]),

			// Compile MDX.
			markdownLanguage,
			EditorView.updateListener.of(compileWhenChanged),
		],
	});

	onMount(() => {
		new EditorView({
			state: initialState,
			parent: container,
		});

		compileMdx(loadSavedDocument());
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
