import { evaluate } from "@mdx-js/mdx";
import { Effect } from "effect";
import { UnknownException } from "effect/Cause";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { JSX } from "solid-js";
import * as runtime from "solid-js/h/jsx-runtime";

/**
 * An effect that compiles MDX content into JSX.
 */
const compileMdx = (
	mdx: string,
): Effect.Effect<JSX.Element, UnknownException> => {
	return Effect.tryPromise(async () => {
		try {
			const { default: renderContent } = await evaluate(mdx, {
				...runtime,
				rehypePlugins: [rehypeKatex],
				remarkPlugins: [remarkMath],
			});

			return renderContent({
				components: {},
			});
		} catch (e) {
			return Effect.fail(new Error(`Failed to compile MDX: ${e}`));
		}
	});
};

export { compileMdx };
