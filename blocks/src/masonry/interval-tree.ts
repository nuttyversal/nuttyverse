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
		// [TODO] Needs to be implemented.
		const node = this.createNode(interval, data);
	}

	/**
	 * Queries the tree for all intervals that overlap with the given interval.
	 */
	query(interval: Interval): T[] {
		// [TODO] Needs to be implemented.
		return [];
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

	private rebalance() {
		// [TODO] Needs to be implemented.
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
		// [TODO] Needs to be implemented.
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
		// [TODO] Needs to be implemented.
	}
}
