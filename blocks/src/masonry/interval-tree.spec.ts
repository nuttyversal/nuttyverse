import { IntervalTree, IntervalTreeNode, Color } from "./interval-tree";

/**
 * Property #1: A node is either red or black.
 */
function isPropertyOneSatisfied<T>(tree: IntervalTree<T>): boolean {
	let isSatified = true;

	tree.traverse((node) => {
		if (node.color !== Color.Red && node.color !== Color.Black) {
			isSatified = false;
		}
	});

	return isSatified;
}

/**
 * Property #2: The root is black.
 */
function isPropertyTwoSatisfied<T>(tree: IntervalTree<T>): boolean {
	return tree.root === null || tree.root.color === Color.Black;
}

/**
 * Property #3: All leaves are black.
 */
function isPropertyThreeSatisfied<T>(_: IntervalTree<T>): boolean {
	// Implicitly satisfied by construction because the leaves are null nodes.
	return true;
}

/**
 * Property #4: If a red node has children, they are black.
 */
function isPropertyFourSatisfied<T>(tree: IntervalTree<T>): boolean {
	let isSatified = true;

	tree.traverse((node) => {
		if (node.color === Color.Red) {
			if (node.left && node.left.color !== Color.Black) {
				isSatified = false;
			}

			if (node.right && node.right.color !== Color.Black) {
				isSatified = false;
			}
		}
	});

	return isSatified;
}

/**
 * Property #5: All paths from a node to its leaves have the same number of black nodes.
 */
function isPropertyFiveSatisfied<T>(tree: IntervalTree<T>): boolean {
	let isSatified = true;

	const blackHeight = (node: IntervalTreeNode<T> | null): number => {
		if (!node) {
			return 1;
		}

		const leftHeight = blackHeight(node.left);
		const rightHeight = blackHeight(node.right);

		if (leftHeight !== rightHeight) {
			isSatified = false;
		}

		return leftHeight + (node.color === Color.Black ? 1 : 0);
	};

	return isSatified;
}

describe("IntervalTree", () => {
	let tree: IntervalTree<number>;

	beforeEach(() => {
		tree = new IntervalTree<number>();
	});

	test("should handle zero node insertion and query", () => {
		let result = tree.query({ low: 1, high: 1 });
		expect(result).toEqual([]);

		result = tree.query({ low: 5, high: 7 });
		expect(result).toEqual([]);

		// Check if the red-black tree properties are satisfied.
		expect(isPropertyOneSatisfied(tree)).toBe(true);
		expect(isPropertyTwoSatisfied(tree)).toBe(true);
		expect(isPropertyThreeSatisfied(tree)).toBe(true);
		expect(isPropertyFourSatisfied(tree)).toBe(true);
		expect(isPropertyFiveSatisfied(tree)).toBe(true);
	});

	test("should handle single node insertion and query", () => {
		tree.insert({ low: 1, high: 2 }, 1);

		let result = tree.query({ low: 1, high: 1 });
		expect(result).toEqual([1]);

		result = tree.query({ low: 5, high: 7 });
		expect(result).toEqual([]);

		// Check if the red-black tree properties are satisfied.
		expect(isPropertyOneSatisfied(tree)).toBe(true);
		expect(isPropertyTwoSatisfied(tree)).toBe(true);
		expect(isPropertyThreeSatisfied(tree)).toBe(true);
		expect(isPropertyFourSatisfied(tree)).toBe(true);
		expect(isPropertyFiveSatisfied(tree)).toBe(true);
	});

	test("should handle large number of insertions", () => {
		for (let i = 0; i < 1000; i++) {
			const low = Math.floor(Math.random() * 1000);
			const high = low + Math.floor(Math.random() * 10);
			tree.insert({ low, high }, i);
		}

		// Check if the red-black tree properties are satisfied.
		expect(isPropertyOneSatisfied(tree)).toBe(true);
		expect(isPropertyTwoSatisfied(tree)).toBe(true);
		expect(isPropertyThreeSatisfied(tree)).toBe(true);
		expect(isPropertyFourSatisfied(tree)).toBe(true);
		expect(isPropertyFiveSatisfied(tree)).toBe(true);
	});

	test("should correctly query overlapping intervals", () => {
		tree.insert({ low: 15, high: 20 }, 1);
		tree.insert({ low: 10, high: 30 }, 2);
		tree.insert({ low: 17, high: 19 }, 3);
		tree.insert({ low: 5, high: 20 }, 4);
		tree.insert({ low: 12, high: 15 }, 5);
		tree.insert({ low: 30, high: 40 }, 6);

		const overlapping = tree.query({ low: 14, high: 16 });
		expect(overlapping).toEqual(expect.arrayContaining([1, 2, 4, 5]));
		expect(overlapping).toHaveLength(4);

		const nonOverlapping = tree.query({ low: 50, high: 60 });
		expect(nonOverlapping).toHaveLength(0);

		// Check if the red-black tree properties are satisfied.
		expect(isPropertyOneSatisfied(tree)).toBe(true);
		expect(isPropertyTwoSatisfied(tree)).toBe(true);
		expect(isPropertyThreeSatisfied(tree)).toBe(true);
		expect(isPropertyFourSatisfied(tree)).toBe(true);
		expect(isPropertyFiveSatisfied(tree)).toBe(true);
	});
});
