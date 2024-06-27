class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
		def traverse(node, path = []) -> int:
			if node is None:
				return 0

			next_path = path + [node.val]
			path_sum = sum(next_path)
			paths = 0

			# Test all paths that end at the current node.
			for value in next_path:
				if path_sum == targetSum:
					paths += 1

				path_sum -= value

			# Test all paths in the current node's subtrees.
			left_subtree_paths = traverse(node.left, next_path)
			right_subtree_paths = traverse(node.right, next_path)

			return paths + left_subtree_paths + right_subtree_paths
	
		return traverse(root)
