import { evaluate } from "@mdx-js/mdx";
import { Effect } from "effect";
import { UnknownException } from "effect/Cause";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { JSX } from "solid-js";
import * as runtime from "solid-js/h/jsx-runtime";
import { Plugin } from "unified";
import { Node, Parent } from "unist";
import { visit } from "unist-util-visit";
import { CodeBlock } from "~/components/CodeBlock";
import { Link } from "~/components/Link";

/**
 * A component registry that maps component names to components.
 * Components must be registered here to be used in MDX content.
 */
const componentRegistry = {
	CodeBlock,
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
				remarkPlugins: [remarkMath, rewriteCodeBlocks],
				rehypePlugins: [rehypeKatex, rewriteLinks],
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
 * Rewrite code block elements into `CodeBlock` component instances.
 */
const rewriteCodeBlocks: Plugin = () => {
	// Inferred from the console output.
	// Does this type exist somewhere?
	type RemarkCode = (Node | Parent) & {
		lang: string;
		value: string;
	};

	return (tree) => {
		visit(tree, "code", (node: RemarkCode, index, parent: RemarkCode) => {
			if (parent != null && index != null) {
				const component = {
					type: "mdxJsxFlowElement",
					name: "CodeBlock",
					attributes: [
						{
							type: "mdxJsxAttribute",
							name: "code",
							value: node.value,
						},
						{
							type: "mdxJsxAttribute",
							name: "language",
							value: node.lang ?? "",
						},
					],
					children: [] as Node[],
				};

				if ("children" in parent) {
					parent.children[index] = component;
				}
			}
		});
	};
};

/**
 * Rewrite `<a>` elements into `Link` component instances.
 */
const rewriteLinks: Plugin = () => {
	// Inferred from the console output.
	// Does this type exist somewhere?
	type RehypeElement = {
		tagName: string;
		properties?: Record<string, unknown>;
		children: Node[];
	};

	return (tree) => {
		visit(
			tree,
			"element",
			(node: RehypeElement, index, parent: RehypeElement) => {
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
