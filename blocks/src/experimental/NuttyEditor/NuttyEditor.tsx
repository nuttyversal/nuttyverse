import { useEffect, useRef, useState } from "react";
import { basicSetup } from "codemirror";
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { vim } from "@replit/codemirror-vim";
import { editorContainer } from "./NuttyEditor.css";

export const NuttyEditor: React.FC = () => {
	const editorContainerRef = useRef<HTMLDivElement>(null);
	const editorViewRef = useRef<EditorView | null>(null);
	const [documentText, setDocumentText] = useState<string>("");

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
					EditorView.updateListener.of((update) => {
						if (update.docChanged) {
							setDocumentText(update.state.doc.toString());
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
		<>
			<div ref={editorContainerRef} className={editorContainer} />
			<pre>{documentText}</pre>
		</>
	);
};
