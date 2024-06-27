class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def longestZigZag(self, root: Optional[TreeNode]) -> int:
		def traverse(node, direction = None, length = 0) -> int:
			if node is None:
				return 0

			if direction == 'L':
				longest_left = traverse(node.left, 'L', 1)
				longest_right = traverse(node.right, 'R', length + 1)
			elif direction == 'R':
				longest_left = traverse(node.left, 'L', length + 1)
				longest_right = traverse(node.right, 'R', 1)
			else:
				longest_left = traverse(node.left, 'L', 1)
				longest_right = traverse(node.right, 'R', 1)

			return max(length, longest_left, longest_right)

		return traverse(root)
