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

type CodeBlockProps = {
	/**
	 * The code snippet to render.
	 */
	code: string;

	/**
	 * The code snippet language.
	 */
	language: "bash" | "typescript";
};

export const CodeBlock: React.FC<CodeBlockProps> = (props) => {
	const highlightedCode = highlightjs.highlight(props.code, {
		language: props.language,
	}).value;

	return (
		<pre className={container}>
			<code
				dangerouslySetInnerHTML={{ __html: highlightedCode }}
				className={code}
			/>
		</pre>
	);
};
