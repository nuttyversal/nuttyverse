import { Fragment, useEffect, useRef, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { basicSetup } from "codemirror";
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, ViewUpdate, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { MDXComponents, MDXContent } from "mdx/types";
import { evaluate } from "@mdx-js/mdx";
import { vim } from "@replit/codemirror-vim";
import { CodeBlock } from "~/atoms/CodeBlock";
import { ContentContainer } from "~/atoms/ContentContainer";
import { Heading } from "~/atoms/Heading";
import { Image } from "~/atoms/Image";
import { Link } from "~/atoms/Link";
import { ListItem, OrderedList, UnorderedList } from "~/atoms/List";
import { Title } from "~/atoms/Title";
import { Text } from "~/atoms/Text";
import { QuoteBlock } from "~/atoms/QuoteBlock";
import { Video } from "~/atoms/Video";
import { editorContainer } from "./NuttyEditor.css";
import {
	rewriteHeaders,
	rewriteImages,
	rewriteLinks,
	rewriteParagraphs,
	rewriteQuoteBlocks,
} from "./plugins";

// List of components that can be used in the MDX editor.
const componentRegistry: MDXComponents = {
	CodeBlock,
	Heading,
	Image,
	Link,
	ListItem,
	OrderedList,
	UnorderedList,
	Title,
	Text,
	QuoteBlock,
	Video,
};

export const NuttyEditor: React.FC = () => {
	const editorContainerRef = useRef<HTMLDivElement>(null);
	const editorViewRef = useRef<EditorView | null>(null);
	const [documentText, setDocumentText] = useState<string>("");
	const mdxError = useRef<string | null>(null);
	const mdxContent = useRef<MDXContent | null>(null);

	async function compileMdx(update: ViewUpdate) {
		if (update.docChanged) {
			// Store the document text.
			setDocumentText(update.state.doc.toString());

			try {
				// Compile the document text.
				const { default: MdxContent } = await evaluate(
					update.state.doc.toString(),
					// @ts-expect-error: `runtime` types are broken.
					{
						...runtime,
						remarkPlugins: [
							rewriteHeaders,
							rewriteImages,
							rewriteLinks,
							rewriteParagraphs,
							rewriteQuoteBlocks,
						],
					},
				);

				mdxContent.current = MdxContent;
				mdxError.current = null;
			} catch (e) {
				mdxError.current = String(e);
			}
		}
	}

	function renderMdx() {
		let Content: JSX.Element = <Fragment />;

		try {
			if (mdxContent.current) {
				Content = mdxContent.current({
					components: componentRegistry,
				});
			}
		} catch (e) {
			mdxError.current = String(e);
		}

		if (mdxError.current) {
			Content = (
				<pre style={{ color: "red", textWrap: "pretty" }}>
					{mdxError.current}
				</pre>
			);
		}

		return Content;
	}

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

					// Compile MDX.
					EditorView.updateListener.of(compileMdx),
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
			<ContentContainer>{renderMdx()}</ContentContainer>
		</div>
	);
};
