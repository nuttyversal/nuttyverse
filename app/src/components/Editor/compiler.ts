import { evaluate } from "@mdx-js/mdx";
import { Effect } from "effect";
import { UnknownException } from "effect/Cause";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { JSX } from "solid-js";
import * as runtime from "solid-js/h/jsx-runtime";
import { Plugin } from "unified";
import { Node } from "unist";
import { visit } from "unist-util-visit";
import { Link } from "~/components/Link";

/**
 * A component registry that maps component names to components.
 * Components must be registered here to be used in MDX content.
 */
const componentRegistry = {
	Link,
};

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
				rehypePlugins: [rehypeKatex, rewriteLinks],
				remarkPlugins: [remarkMath],
			});

			return renderContent({
				components: componentRegistry,
			});
		} catch (e) {
			return Effect.fail(new Error(`Failed to compile MDX: ${e}`));
		}
	});
};

/**
 * Rewrite `<a>` elements into `Link` component instances.
 */
const rewriteLinks: Plugin = () => {
	// Inferred from the console output.
	// Does this type exist somewhere?
	type RemarkElement = {
		tagName: string;
		properties?: Record<string, unknown>;
		children: Node[];
	};

	return (tree) => {
		visit(
			tree,
			"element",
			(node: RemarkElement, index, parent: RemarkElement) => {
				if (node.tagName === "a") {
					const href = node.properties?.href as string;

					if (href) {
						const component = {
							type: "element",
							tagName: "Link",
							children: node.children,
							properties: {
								href,
								newTab: !href.startsWith("/"),
							},
						};

						if (parent) {
							parent.children[index] = component;
						}
					}
				}
			},
		);
	};
};

export { compileMdx };
