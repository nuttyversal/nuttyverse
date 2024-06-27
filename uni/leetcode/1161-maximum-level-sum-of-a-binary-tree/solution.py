import collections


class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def maxLevelSum(self, root: Optional[TreeNode]) -> int:
		# (node, height) to explore.
		queue = collections.deque()
		queue.append((root, 1))

		# Sum of values at each tree level.
		level_sum = collections.defaultdict(int)

		# Sum all values at each tree level.
		while len(queue) > 0:
			(node, height) = queue.popleft()

			if node is None:
				continue

			level_sum[height] += node.val
			queue.append((node.left, height + 1))
			queue.append((node.right, height + 1))

		# Find max level sum.
		max_sum = -math.inf
		max_level = None

		for level, sum in level_sum.items():
			if sum > max_sum:
				max_sum = sum
				max_level = level

		return max_level
