/**
 * Represents the closed interval: [low, high].
 */
type Interval = {
	low: number;
	high: number;
};

/**
 * Represents the color of a node in a red-black tree.
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

	insert(interval: Interval) {
		// [TODO] Needs to be implemented.
	}

	query(interval: Interval): T[] {
		// [TODO] Needs to be implemented.
		return [];
	}

	private rebalance() {
		// [TODO] Needs to be implemented.
	}

	private rotateLeft(node: IntervalTreeNode<T>) {
		// [TODO] Needs to be implemented.
	}

	private rotateRight(node: IntervalTreeNode<T>) {
		// [TODO] Needs to be implemented.
	}
}
