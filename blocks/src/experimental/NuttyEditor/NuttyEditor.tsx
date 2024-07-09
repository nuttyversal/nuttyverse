import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { vim } from "@replit/codemirror-vim";

export const NuttyEditor: React.FC = () => {
	const editorContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (editorContainerRef.current) {
			const initialState = EditorState.create({
				doc: "Nutty Editor",
				extensions: [vim(), keymap.of(defaultKeymap)],
			});

			new EditorView({
				state: initialState,
				parent: editorContainerRef.current,
			});
		}
	}, []);

	return <div ref={editorContainerRef} />;
};
