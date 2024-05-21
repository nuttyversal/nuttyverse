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
enum RedBlackTreeNodeColor {
	Red = "RED",
	Black = "BLACK",
}

/**
 * Represents a node storing an interval in a red-black tree.
 */
type IntervalTreeNode = {
	interval: Interval;
	left: IntervalTreeNode | null;
	right: IntervalTreeNode | null;
	parent: IntervalTreeNode | null;
	color: RedBlackTreeNodeColor;

	/**
	 * Keep track of the maximum high value in the subtree rooted at the
	 * node to facilitate efficient searching for overlapping intervals.
	 */
	max: number;
};

/**
 * A red-black interval tree.
 */
export class IntervalTree {
	root: IntervalTreeNode | null;

	constructor() {
		this.root = null;
	}
}
