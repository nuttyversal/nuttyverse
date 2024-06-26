class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def maxDepth(self, root: Optional[TreeNode]) -> int:
		def traverse(node: Optional[TreeNode], depth: int = 0) -> int:
			if node is None:
				return depth

			left_depth = traverse(node.left, depth + 1)
			right_depth = traverse(node.right, depth + 1)

			return max(left_depth, right_depth)

		return traverse(root)
