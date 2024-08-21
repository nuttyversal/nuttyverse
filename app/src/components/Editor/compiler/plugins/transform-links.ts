import { Element } from "hast";
import { Plugin } from "unified";
import { Node, Parent } from "unist";
import { Test, visit } from "unist-util-visit";

/**
 * Links should open in a new tab if they are external.
 */
const shouldOpenInNewTab = (url: string) => {
	return !url.startsWith("/");
};

/**
 * Create an AST-representation of a `Link` component instance.
 */
const createLinkComponent = (node: Element) => {
	const href = node.properties.href as string;

	return {
		tagName: "Link",
		type: "element",
		properties: {
			href: href,
			newTab: shouldOpenInNewTab(href),
		},
		position: node.position,
		children: node.children,
	} as const;
};

/**
 * Transform `<a>` elements into `Link` component instances.
 */
const transformLinks: Plugin = () => {
	return (tree) => {
		visit<Node | Parent, Test>(tree, "element", (node, index, parent) => {
			// Narrow the type of the node.
			const elementNode = node as Element;

			if ("tagName" in node && node.tagName === "a") {
				if (parent?.children && index !== undefined) {
					parent.children[index] = createLinkComponent(elementNode);
				}
			}
		});
	};
};

export { transformLinks };
