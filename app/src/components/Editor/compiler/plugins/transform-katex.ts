import { Element, Text } from "hast";
import KaTeX from "katex";
import { Plugin } from "unified";
import { Node, Parent } from "unist";
import { SKIP, Test, visitParents } from "unist-util-visit-parents";
import { KaTeXRenderError } from "../errors";

/**
 * Transform KaTeX expressions into beautifully typeset math.
 */
const transformKaTeX: Plugin = () => {
	return (tree) => {
		visitParents<Node | Parent, Test>(tree, "element", (node, parents) => {
			// Narrow the type of the node.
			const elementNode = node as Element;

			// Retrieve the class names to determine if this is a KaTeX expression.
			const classes = Array.isArray(elementNode.properties?.className)
				? elementNode.properties.className
				: [];

			// Generated by remark-math with $$…$$.
			const isMathDisplay = classes.includes("math-display");

			// Generated by remark-math with $…$.
			const isMathInline = classes.includes("math-inline");

			if (!isMathDisplay && !isMathInline) {
				// Skip!
				return;
			}

			// Extract the KaTeX expression.
			const textNode = elementNode.children[0] as Text;
			const katexExpression = textNode.value;

			try {
				// Render the KaTeX expression.
				const html = KaTeX.renderToString(katexExpression, {
					throwOnError: false,
					displayMode: isMathDisplay,
				});

				// Create new element node with rendered KaTeX expression.
				const renderedNode = {
					type: "element",
					tagName: isMathDisplay ? "div" : "span",
					properties: { innerHTML: html },
					position: elementNode.position,
				};

				// Replace the current node with the rendered node.
				const parent = parents[parents.length - 1];
				const index = parent.children.indexOf(elementNode);
				parent.children.splice(index, 1, renderedNode);
			} catch (e) {
				throw new KaTeXRenderError(katexExpression);
			}

			// Don't traverse children.
			return SKIP;
		});
	};
};

export { transformKaTeX };
