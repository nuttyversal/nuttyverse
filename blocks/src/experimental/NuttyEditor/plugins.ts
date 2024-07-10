import { Plugin } from "unified";
import { Node, Parent } from "unist";
import { visit } from "unist-util-visit";

type FlowElement = {
	type: "mdxJsxFlowElement";
	name: string;
	attributes: Array<{ type: "mdxJsxAttribute"; name: string; value: string }>;
	children: Node[];
};

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
				if (parent !== null && parent.type === "root" && index !== null) {
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

export const rewriteHeaders: Plugin = () => {
	return (tree) => {
		visit(
			tree,
			"heading",
			(
				node: (Node | Parent) & { depth: number },
				index: number | null,
				parent: Parent | null,
			) => {
				if (parent !== null && index !== null) {
					let component: FlowElement | null = null;

					if (node.depth === 1) {
						component = {
							type: "mdxJsxFlowElement",
							name: "Title",
							attributes: [createAttribute("fleuron", "true")],
							children: [] as Node[],
						};
					} else {
						component = {
							type: "mdxJsxFlowElement",
							name: "Heading",
							attributes: [createAttribute("type", `h${node.depth}`)],
							children: [] as Node[],
						};
					}

					if ("children" in node) {
						component.children = node.children;
					}

					parent.children[index] = component;
				}
			},
		);
	};
};

export const rewriteLinks: Plugin = () => {
	return (tree) => {
		visit(
			tree,
			"link",
			(
				node: (Node | Parent) & { url: string },
				index: number | null,
				parent: Parent | null,
			) => {
				if (parent !== null && index !== null) {
					const component = {
						type: "mdxJsxFlowElement",
						name: "Link",
						attributes: [createAttribute("href", node.url)],
						children: [] as Node[],
					};

					if (!node.url.startsWith("/")) {
						component.attributes.push(createAttribute("newTab", "true"));
					}

					if ("children" in node) {
						component.children = node.children;
					}

					parent.children[index] = component;
				}
			},
		);
	};
};

export const rewriteImages: Plugin = () => {
	return (tree) => {
		visit(
			tree,
			"image",
			(
				node: (Node | Parent) & { url: string; alt: string },
				index: number | null,
				parent: Parent | null,
			) => {
				if (parent !== null && index !== null) {
					const component = {
						type: "mdxJsxFlowElement",
						name: "Image",
						attributes: [
							createAttribute("src", node.url),
							createAttribute("alt", node.alt),
						],
						children: [] as Node[],
					};

					parent.children[index] = component;
				}
			},
		);
	};
};

export const rewriteQuoteBlocks: Plugin = () => {
	return (tree) => {
		visit(
			tree,
			"blockquote",
			(node: Node | Parent, index: number | null, parent: Parent | null) => {
				if (parent !== null && index !== null) {
					const component = {
						type: "mdxJsxFlowElement",
						name: "QuoteBlock",
						attributes: [],
						children: [] as Node[],
					};

					if ("children" in node) {
						component.children = node.children;
					}

					parent.children[index] = component;
				}
			},
		);
	};
};

export const rewriteCodeInline: Plugin = () => {
	return (tree) => {
		visit(
			tree,
			"inlineCode",
			(
				node: (Node | Parent) & { value: string },
				index: number | null,
				parent: Parent | null,
			) => {
				if (parent !== null && index !== null) {
					const component = {
						type: "mdxJsxFlowElement",
						name: "Code",
						attributes: [createAttribute("children", node.value)],
						children: [] as Node[],
					};

					parent.children[index] = component;
				}
			},
		);
	};
};

export const rewriteCodeBlocks: Plugin = () => {
	return (tree) => {
		visit(
			tree,
			"code",
			(
				node: (Node | Parent) & { lang: string; value: string },
				index: number | null,
				parent: Parent | null,
			) => {
				if (parent !== null && index !== null) {
					const component = {
						type: "mdxJsxFlowElement",
						name: "CodeBlock",
						attributes: [
							createAttribute("code", node.value),
							createAttribute("language", node.lang ?? ""),
						],
						children: [] as Node[],
					};

					parent.children[index] = component;
				}
			},
		);
	};
};

export const rewriteLists: Plugin = () => {
	return (tree) => {
		visit(
			tree,
			"list",
			(
				node: (Node | Parent) & { ordered: boolean },
				index: number | null,
				parent: Parent | null,
			) => {
				if (parent !== null && index !== null) {
					const component = {
						type: "mdxJsxFlowElement",
						name: node.ordered ? "OrderedList" : "UnorderedList",
						attributes: [],
						children: [] as Node[],
					};

					if ("children" in node) {
						component.children = node.children;
					}

					parent.children[index] = component;
				}
			},
		);
	};
};
