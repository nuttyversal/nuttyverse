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

	const [documentText, setDocumentText] = createSignal<string>("");
	const [mdxContent, setMdxContent] = createSignal<Element | null>(null);

	const compileMdx = async (update: ViewUpdate) => {
		if (update.docChanged) {
			// Store the document text.
			setDocumentText(update.state.doc.toString());

			try {
				const { default: renderContent } = await evaluate(
					update.state.doc.toString(),
					{
						...runtime,
						rehypePlugins: [rehypeKatex],
						remarkPlugins: [remarkMath],
					},
				);

				let Content = renderContent({
					components: {},
				});

				setMdxContent(Content);
			} catch (e) {
				console.error("Failed to compile MDX:", e);
			}
		}
	};

	const initialState = EditorState.create({
		doc: "",
		extensions: [
			vim(),
			basicSetup,

			// Tab indentation.
			indentUnit.of("\t"),
			EditorState.tabSize.of(3),
			keymap.of([indentWithTab]),

			// Compile MDX.
			markdownLanguage,
			EditorView.updateListener.of(compileMdx),
		],
	});

	onMount(() => {
		new EditorView({
			state: initialState,
			parent: container,
		});
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
