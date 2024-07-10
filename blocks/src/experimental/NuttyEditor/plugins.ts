import { Plugin } from "unified";
import { Node, Parent } from "unist";
import { visit } from "unist-util-visit";

const createAttribute = (name: string, value: string) => {
	return {
		type: "mdxJsxAttribute",
		name: name,
		value: value,
	} as const;
};

export const rewriteParagraphs: Plugin = () => {
	return (tree) => {
		visit(
			tree,
			"paragraph",
			(node: Node | Parent, index: number | null, parent: Parent | null) => {
				if (parent && index !== null) {
					const textComponent = {
						type: "mdxJsxFlowElement",
						name: "Text",
						attributes: [createAttribute("as", "p")],
						children: [] as Node[],
					};

					if ("children" in node) {
						textComponent.children = node.children;
					}

					parent.children[index] = textComponent;
				}
			},
		);
	};
};
