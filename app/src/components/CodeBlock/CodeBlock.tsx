import highlightjs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import html from "highlight.js/lib/languages/xml";
import typescript from "highlight.js/lib/languages/typescript";
import { Component } from "solid-js";
import styles from "./CodeBlock.module.scss";

// [NOTE] Hey there! Remember to extend the union type
// when registering a new programming language.
highlightjs.registerLanguage("bash", bash);
highlightjs.registerLanguage("html", html);
highlightjs.registerLanguage("typescript", typescript);

const supportedLanguages = ["bash", "html", "typescript"] as const;

type Props = {
	/**
	 * The code snippet to render.
	 */
	code: string;

	/**
	 * The code snippet language.
	 */
	language: (typeof supportedLanguages)[number];

	class?: string;
};

const CodeBlock: Component<Props> = (props) => {
	const classes = [styles.container, props.class].filter(Boolean).join(" ");

	if (!supportedLanguages.includes(props.language)) {
		return (
			<pre class={classes}>
				<code>{props.code}</code>
			</pre>
		);
	}

	const highlightedCode = highlightjs.highlight(props.code, {
		language: props.language,
	}).value;

	return (
		<pre class={classes} data-testid="code">
			<code innerHTML={highlightedCode} />
		</pre>
	);
};

export { CodeBlock };
