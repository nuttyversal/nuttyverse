/**
 * Represents the closed interval: [low, high].
 */
type Interval = {
	low: number;
	high: number;
};

/**
 * Represents the color of a node in a red-black tree.
 *
 * ✦ Every node is either red or black.
 * ✦ The root is black.
 * ✦ Every leaf (null) is black.
 * ✦ If a node is red, then both its children are black.
 * ✦ For each node, all simple paths from the node to the descendant leaves
 *   contain the same number of black nodes.
 */
enum Color {
	Red = "RED",
	Black = "BLACK",
}

/**
 * Represents a node storing an interval in a red-black tree.
 */
type IntervalTreeNode<T> = {
	data: T;
	interval: Interval;
	left: IntervalTreeNode<T> | null;
	right: IntervalTreeNode<T> | null;
	parent: IntervalTreeNode<T> | null;
	color: Color;

	/**
	 * Keep track of the maximum high value in the subtree rooted at the
	 * node to facilitate efficient searching for overlapping intervals.
	 */
	max: number;
};

/**
 * A red-black interval tree.
 */
export class IntervalTree<T> {
	root: IntervalTreeNode<T> | null;

	constructor() {
		this.root = null;
	}

	/**
	 * Inserts a new interval with the given data into the tree.
	 */
	insert(interval: Interval, data: T) {
		const node = this.createNode(interval, data);

		let x = this.root;
		let y: IntervalTreeNode<T> | null = null;

		while (x !== null) {
			y = x;

			// Update the maximum high value in the subtree rooted at x.
			x.max = Math.max(x.max, node.max);

			if (node.interval.low < x.interval.low) {
				x = x.left;
			} else {
				x = x.right;
			}
		}

		node.parent = y;

		if (y === null) {
			this.root = node;
		} else if (node.interval.low < y.interval.low) {
			y.left = node;
		} else {
			y.right = node;
		}

		this.rebalance(node);
	}

	/**
	 * Queries the tree for all intervals that overlap with the given interval.
	 */
	query(interval: Interval): T[] {
		const result: T[] = [];

		if (this.root !== null) {
			this.search(this.root, interval, result);
		}

		return result;
	}

	/**
	 * Search for intervals that overlap with the given interval in the subtree.
	 */
	private search(node: IntervalTreeNode<T>, interval: Interval, result: T[]) {
		if (node === null) {
			return;
		}

		if (this.overlaps(node.interval, interval)) {
			result.push(node.data);
		}

		if (node.left !== null && node.left.max >= interval.low) {
			this.search(node.left, interval, result);
		}

		if (node.right !== null && node.interval.low <= interval.high) {
			this.search(node.right, interval, result);
		}
	}

	/**
	 * Returns `true` if the given intervals overlap, `false` otherwise.
	 */
	private overlaps(a: Interval, b: Interval): boolean {
		return a.low <= b.high && b.low <= a.high;
	}

	/**
	 * Creates a new node with the given interval and data.
	 */
	private createNode(interval: Interval, data: T): IntervalTreeNode<T> {
		return {
			data,
			interval,
			left: null,
			right: null,
			parent: null,
			color: Color.Red,
			max: interval.high,
		};
	}

	/**
	 * Rebalances the tree to maintain the red-black properties of the tree.
	 */
	private rebalance(node: IntervalTreeNode<T>) {
		let z = node;

		while (z.parent!.color === Color.Red) {
			if (z.parent === z.parent!.parent!.left) {
				const y = z.parent!.parent!.right;

				// Case 1: z's uncle y is red.
				if (y!.color === Color.Red) {
					z.parent!.color = Color.Black;
					y!.color = Color.Black;
					z.parent!.parent!.color = Color.Red;
					z = z.parent!.parent!;
				} else {
					// Case 2: z's uncle y is black and z is a right child.
					if (z === z.parent!.right) {
						z = z.parent!;
						this.rotateLeft(z);
					}

					// Case 3: z's uncle y is black and z is a left child.
					z.parent!.color = Color.Black;
					z.parent!.parent!.color = Color.Red;
					this.rotateRight(z.parent!.parent!);
				}
			} else {
				const y = z.parent!.parent!.left;

				// Case 1: z's uncle y is red.
				if (y!.color === Color.Red) {
					z.parent!.color = Color.Black;
					y!.color = Color.Black;
					z.parent!.parent!.color = Color.Red;
					z = z.parent!.parent!;
				} else {
					// Case 2: z's uncle y is black and z is a left child.
					if (z === z.parent!.left) {
						z = z.parent!;
						this.rotateRight(z);
					}

					// Case 3: z's uncle y is black and z is a right child.
					z.parent!.color = Color.Black;
					z.parent!.parent!.color = Color.Red;
					this.rotateLeft(z.parent!.parent!);
				}
			}
		}

		this.root!.color = Color.Black;
	}

	/**
	 *     ┏━┓                    ┏━┓
	 *  ┌──┃X┃──┐              ┌──┃Y┃──┐
	 *  │  ┗━┛  │              │  ┗━┛  │
	 * ┌─┐     ┏━┓            ┏━┓     ┌─┐
	 * │α│   ┌─┃Y┃─┐ ─────▶ ┌─┃X┃─┐   │ɣ│
	 * └─┘   │ ┗━┛ │        │ ┗━┛ │   └─┘
	 *      ┌─┐   ┌─┐      ┌─┐   ┌─┐
	 *      │β│   │ɣ│      │α│   │β│
	 *      └─┘   └─┘      └─┘   └─┘
	 */
	private rotateLeft(node: IntervalTreeNode<T>) {
		const x = node;

		if (x.right === null) {
			throw new Error("Cannot rotate left with null right child.");
		}

		const y = x.right;
		x.right = y.left;

		if (y.left !== null) {
			y.left.parent = x;
		}

		y.parent = x.parent;

		if (x.parent === null) {
			this.root = y;
		} else if (x === x.parent.left) {
			x.parent.left = y;
		} else {
			x.parent.right = y;
		}

		y.left = x;
		x.parent = y;

		x.max = Math.max(
			x.interval.high,
			x.left?.max ?? -Infinity,
			x.right?.max ?? -Infinity,
		);

		y.max = Math.max(
			y.interval.high,
			y.left?.max ?? -Infinity,
			y.right?.max ?? -Infinity,
		);
	}

	/**
	 *        ┏━┓                ┏━┓
	 *     ┌──┃Y┃──┐          ┌──┃X┃──┐
	 *     │  ┗━┛  │          │  ┗━┛  │
	 *    ┏━┓     ┌─┐        ┌─┐     ┏━┓
	 *  ┌─┃X┃─┐   │ɣ│ ─────▶ │α│   ┌─┃Y┃─┐
	 *  │ ┗━┛ │   └─┘        └─┘   │ ┗━┛ │
	 * ┌─┐   ┌─┐                  ┌─┐   ┌─┐
	 * │α│   │β│                  │β│   │ɣ│
	 * └─┘   └─┘                  └─┘   └─┘
	 */
	private rotateRight(node: IntervalTreeNode<T>) {
		const y = node;

		if (y.left === null) {
			throw new Error("Cannot rotate right with null left child.");
		}

		const x = y.left;
		y.left = x.right;

		if (x.right !== null) {
			x.right.parent = y;
		}

		x.parent = y.parent;

		if (y.parent === null) {
			this.root = x;
		} else if (y === y.parent.right) {
			y.parent.right = x;
		} else {
			y.parent.left = x;
		}

		x.right = y;
		y.parent = x;

		y.max = Math.max(
			y.interval.high,
			y.left?.max ?? -Infinity,
			y.right?.max ?? -Infinity,
		);

		x.max = Math.max(
			x.interval.high,
			x.left?.max ?? -Infinity,
			x.right?.max ?? -Infinity,
		);
	}
}
