import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { vim } from "@replit/codemirror-vim";

export const NuttyEditor: React.FC = () => {
	const editorContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (editorContainerRef.current) {
			const initialState = EditorState.create({
				doc: "Nutty Editor",
				extensions: [vim(), basicSetup],
			});

			new EditorView({
				state: initialState,
				parent: editorContainerRef.current,
			});
		}
	}, []);

	return <div ref={editorContainerRef} />;
};
