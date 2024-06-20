from collections import defaultdict


class Solution:
	def equalPairs(self, grid: List[List[int]]) -> int:
		n = len(grid)
		rows = defaultdict(int)
		cols = defaultdict(int)

		# Collect number of sequence occurrences.
		for i in range(n):
			row = ",".join(map(str, grid[i]))
			col = ",".join(map(str, [grid[j][i] for j in range(n)]))
			rows[row] += 1
			cols[col] += 1

		# Find common sequences.
		row_sequences = set(rows.keys())
		col_sequences = set(cols.keys())
		common_sequences = row_sequences.intersection(col_sequences)

		# Count equal (row, col) pairs.
		equal_pairs = 0
		for sequence in common_sequences:
			equal_pairs += rows[sequence] * cols[sequence]

		return equal_pairs
