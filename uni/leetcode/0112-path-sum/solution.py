class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
		def traverse(node, path = []) -> bool:
			if node is None:
				return False

			if node.left is None and node.right is None:
				return node.val + sum(path) == targetSum

			left_has_path_sum = traverse(node.left, path + [node.val])
			right_has_path_sum = traverse(node.right, path + [node.val])

			return left_has_path_sum or right_has_path_sum
	
		return traverse(root)
