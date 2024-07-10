import highlightjs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";
import { code, container } from "./CodeBlock.css";

// Import global styles as side-effect.
import "./themes/github-light.css";
import "./themes/github-dark.css";
import "./themes/override.css";

// [NOTE] Hey there! Remember to extend the union type
// when registering a new programming language.
highlightjs.registerLanguage("bash", bash);
highlightjs.registerLanguage("typescript", typescript);

const supportedLanguages = ["bash", "typescript"] as const;

type CodeBlockProps = {
	/**
	 * The code snippet to render.
	 */
	code: string;

	/**
	 * The code snippet language.
	 */
	language: (typeof supportedLanguages)[number];

	/**
	 * If enabled (`true`), disables the application of natural margin styles.
	 */
	marginless?: boolean;
};

export const CodeBlock: React.FC<CodeBlockProps> = (props) => {
	// Consistent rem-based margin.
	const margin = "1.2rem 0";

	const containerStyles = {
		margin: props.marginless ? undefined : margin,
	};

	if (!supportedLanguages.includes(props.language)) {
		return (
			<pre className={container} style={containerStyles}>
				<code className={code}>{props.code}</code>
			</pre>
		);
	}

	const highlightedCode = highlightjs.highlight(props.code, {
		language: props.language,
	}).value;

	return (
		<pre className={container} style={containerStyles}>
			<code
				dangerouslySetInnerHTML={{ __html: highlightedCode }}
				className={code}
			/>
		</pre>
	);
};
