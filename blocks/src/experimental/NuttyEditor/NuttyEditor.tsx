import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { vim } from "@replit/codemirror-vim";
import { editorContainer } from "./NuttyEditor.css";

export const NuttyEditor: React.FC = () => {
	const editorContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (editorContainerRef.current) {
			const initialState = EditorState.create({
				doc: "Nutty Editor",
				extensions: [
					vim(),
					basicSetup,
					indentUnit.of("\t"),
					EditorState.tabSize.of(3),
					keymap.of([indentWithTab]),
				],
			});

			new EditorView({
				state: initialState,
				parent: editorContainerRef.current,
			});
		}
	}, []);

	return <div ref={editorContainerRef} className={editorContainer} />;
};
