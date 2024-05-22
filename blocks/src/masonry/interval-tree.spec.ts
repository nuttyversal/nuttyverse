import { IntervalTree, Interval, Color } from "./interval-tree";

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
	});

	test("should handle single node insertion and query", () => {
		tree.insert({ low: 1, high: 2 }, 1);

		let result = tree.query({ low: 1, high: 1 });
		expect(result).toEqual([1]);

		result = tree.query({ low: 5, high: 7 });
		expect(result).toEqual([]);
	});

	test("should insert and balance the intervals correctly", () => {
		const intervals: Interval[] = [
			{ low: 15, high: 20 },
			{ low: 10, high: 30 },
			{ low: 17, high: 19 },
			{ low: 5, high: 20 },
			{ low: 12, high: 15 },
			{ low: 30, high: 40 },
		];

		intervals.forEach((interval, index) => {
			tree.insert(interval, index);
		});

		expect(tree.root).not.toBeNull();
		expect(tree.root!.color).toBe(Color.Black);
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
	});
});
