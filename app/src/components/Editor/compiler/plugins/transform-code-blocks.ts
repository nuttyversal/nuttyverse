import { Code } from "mdast";
import { Plugin } from "unified";
import { Node, Parent } from "unist";
import { Test, visit } from "unist-util-visit";

/**
 * Create an AST-representation of a `CodeBlock` component instance.
 */
const createCodeBlockComponent = (node: Code) => {
	return {
		name: "CodeBlock",
		type: "mdxJsxFlowElement",
		attributes: [
			{
				type: "mdxJsxAttribute",
				name: "code",
				value: node.value,
			},
			{
				type: "mdxJsxAttribute",
				name: "language",
				value: node.lang,
			},
		],
		position: node.position,
		children: [],
	} as const;
};

/**
 * Transform code blocks into `CodeBlock` component instances.
 */
const transformCodeBlocks: Plugin = () => {
	return (tree) => {
		visit<Node | Parent, Test>(tree, "code", (node, index, parent) => {
			// Narrow the type of the node.
			const codeNode = node as Code;

			if (parent?.children && index !== undefined) {
				parent.children[index] = createCodeBlockComponent(codeNode);
			}
		});
	};
};

export { transformCodeBlocks };
