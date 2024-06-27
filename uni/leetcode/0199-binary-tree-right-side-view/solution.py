import collections


class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
		# (node, height) to explore.
		queue = collections.deque()
		queue.append((root, 0))

		# Nodes that have been explored.
		explored = set([root])

		# Rightmost node for each height.
		rightmost = {}

		while len(queue) > 0:
			# Explore the next node.
			(node, height) = queue.popleft()

			# Skip null nodes.
			if node is None:
				continue

			# Update rightmost node.
			rightmost[height] = node.val

			# Explore subtrees.
			queue.append((node.left, height + 1))
			queue.append((node.right, height + 1))

		return list(rightmost.values())
