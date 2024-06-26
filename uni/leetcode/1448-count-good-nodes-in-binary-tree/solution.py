class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def goodNodes(self, root: TreeNode) -> int:
		def traverse(node, path = [], path_max = -math.inf) -> int:
			if node is None:
				return 0

			left = traverse(node.left, path + [node], max(node.val, path_max))
			right = traverse(node.right, path + [node], max(node.val, path_max))

			if node.val >= path_max:
				return left + right + 1
			else:
				return left + right

		return traverse(root)
