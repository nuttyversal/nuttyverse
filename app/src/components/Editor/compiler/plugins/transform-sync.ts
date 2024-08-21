import { Element } from "hast";
import { Setter } from "solid-js";
import { Plugin } from "unified";
import { Node, Parent } from "unist";
import { Test, visit } from "unist-util-visit";
import { ElementBlock, SourceMap } from "../../sync/types";

/**
 * Transforms the nodes and annotates them with `.source-map-<line-number>`
 * classes to create a source map for scroll synchronization.
 */
const transformSync =
	(setSourceMap: Setter<SourceMap>): Plugin =>
	() => {
		const sourceMap: SourceMap = {};

		const transformNode = (node: Element, cursor: number) => {
			// Get location of node in the source.
			const startLine = node.position?.start.line ?? null;
			const endLine = node.position?.end.line ?? null;

			if (startLine === null || endLine === null || cursor > startLine) {
				return cursor;
			}

			// If the node is an HTML element...
			node.properties = node.properties ?? {};
			node.properties.className = Array.isArray(node.properties.className)
				? node.properties.className
				: node.properties.className
					? [node.properties.className as string]
					: [];

			node.properties.className.push(`source-map-${startLine}`);

			// If the node is a JSX element...
			if ("attributes" in node) {
				node.attributes = node.attributes ?? [];

				// [NOTE] Components will need a `class` prop.
				(node.attributes as any[]).push({
					type: "mdxJsxAttribute",
					name: "class",
					value: `source-map-${startLine}`,
				});
			}

			// Update the source map.
			for (let i = startLine; i <= endLine; i++) {
				sourceMap[i] = {
					type: "element",
					start: startLine,
					end: endLine,
					selector: `.source-map-${startLine}`,
				};
			}

			return endLine;
		};

		// Fill in the gaps between blocks with empty blocks.
		const fillEmptyBlocks = () => {
			const keys = Object.keys(sourceMap).map(Number);

			for (let i = 1; i < keys.length; i++) {
				const previous = sourceMap[keys[i - 1]] as ElementBlock;
				const next = sourceMap[keys[i]] as ElementBlock;

				if (next.start - previous.end > 1) {
					for (let j = previous.end + 1; j < next.start; j++) {
						sourceMap[j] = {
							type: "empty",
							start: previous.end + 1,
							end: next.start - 1,
							previous,
							next,
						};
					}
				}
			}
		};

		return (tree) => {
			let cursor: number = 1;

			// Transform JSX elements.
			visit<Node | Parent, Test>(tree, "mdxJsxFlowElement", (node) => {
				cursor = transformNode(node as Element, cursor);
			});

			cursor = 1;

			// Transform HTML elements.
			visit<Node | Parent, Test>(tree, "element", (node) => {
				cursor = transformNode(node as Element, cursor);
			});

			// Fill in the gaps with empty blocks.
			fillEmptyBlocks();

			// Send the source map to compiler.
			setSourceMap(sourceMap);
		};
	};

export { transformSync };
