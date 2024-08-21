import * as runtime from "solid-js/h/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import { Effect } from "effect";
import remarkMath from "remark-math";
import { Setter } from "solid-js";
import { CompileError } from "./errors";
import { transformCodeBlocks } from "./plugins/transform-code-blocks";
import { transformKaTeX } from "./plugins/transform-katex";
import { transformLinks } from "./plugins/transform-links";
import { transformSync } from "./plugins/transform-sync";
import { componentRegistry } from "./registry";
import { SourceMap } from "../sync/types";

/**
 * An effect that compiles MDX source code into JSX element.
 */
const compileMarkdownJsx = (
	markdown: string,
	setSourceMap: Setter<SourceMap>,
) => {
	return Effect.tryPromise({
		try: async () => {
			const { default: renderContent } = await evaluate(markdown, {
				...runtime,
				remarkPlugins: [remarkMath, transformCodeBlocks],
				rehypePlugins: [
					transformKaTeX,
					transformLinks,
					transformSync(setSourceMap),
				],
			});

			return renderContent({
				components: componentRegistry,
			});
		},
		catch: () => {
			return new CompileError();
		},
	});
};

export { compileMarkdownJsx };
