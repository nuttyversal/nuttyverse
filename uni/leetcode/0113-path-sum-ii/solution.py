class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
		def traverse(node, path = []) -> List[List[int]]:
			if node is None:
				return []

			if node.left is None and node.right is None:
				if node.val + sum(path) == targetSum:
					return [path + [node.val]]

			left_paths = traverse(node.left, path + [node.val])
			right_paths = traverse(node.right, path + [node.val])

			return left_paths + right_paths
	
		return traverse(root)
