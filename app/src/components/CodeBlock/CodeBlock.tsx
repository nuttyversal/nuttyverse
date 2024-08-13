import highlightjs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";
import { Component } from "solid-js";
import styles from "./CodeBlock.module.scss";

// [NOTE] Hey there! Remember to extend the union type
// when registering a new programming language.
highlightjs.registerLanguage("bash", bash);
highlightjs.registerLanguage("typescript", typescript);

const supportedLanguages = ["bash", "typescript"] as const;

type Props = {
	/**
	 * The code snippet to render.
	 */
	code: string;

	/**
	 * The code snippet language.
	 */
	language: (typeof supportedLanguages)[number];
};

const CodeBlock: Component<Props> = (props) => {
	if (!supportedLanguages.includes(props.language)) {
		return (
			<pre class={styles.container}>
				<code>{props.code}</code>
			</pre>
		);
	}

	const highlightedCode = highlightjs.highlight(props.code, {
		language: props.language,
	}).value;

	return (
		<pre class={styles.container}>
			<code innerHTML={highlightedCode} />
		</pre>
	);
};

export { CodeBlock };
