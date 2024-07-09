import { Fragment, useEffect, useRef, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { basicSetup } from "codemirror";
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { evaluate } from "@mdx-js/mdx";
import { vim } from "@replit/codemirror-vim";
import { editorContainer } from "./NuttyEditor.css";
import { MDXContent } from "mdx/types";

export const NuttyEditor: React.FC = () => {
	const editorContainerRef = useRef<HTMLDivElement>(null);
	const editorViewRef = useRef<EditorView | null>(null);
	const [documentText, setDocumentText] = useState<string>("");
	const mdxContent = useRef<MDXContent | null>(null);
	const Content = mdxContent.current ?? Fragment;

	useEffect(() => {
		if (editorContainerRef.current) {
			// Destroy the editor if it already exists.
			// This makes hot-reloading work properly.
			if (editorViewRef.current) {
				editorViewRef.current.destroy();
			}

			const initialState = EditorState.create({
				doc: documentText,
				extensions: [
					vim(),
					basicSetup,

					// Tab indentation.
					indentUnit.of("\t"),
					EditorState.tabSize.of(3),
					keymap.of([indentWithTab]),

					// Listen to state changes.
					EditorView.updateListener.of(async (update) => {
						if (update.docChanged) {
							// Store the document text.
							setDocumentText(update.state.doc.toString());

							// Compile and evaluate the document text into a functional component.
							const { default: MdxContent } = await evaluate(
								update.state.doc.toString(),
								// @ts-expect-error: `runtime` types are broken.
								runtime,
							);

							mdxContent.current = MdxContent;
						}
					}),
				],
			});

			editorViewRef.current = new EditorView({
				state: initialState,
				parent: editorContainerRef.current,
			});
		}
	}, []);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
			<div ref={editorContainerRef} className={editorContainer} />
			<hr />
			<Content />
		</div>
	);
};
