class TreeNode:
	def __init__(self, x):
		self.val = x
		self.left = None
		self.right = None


class Solution:
	def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
		def get_path(root, target, path) -> Optional[List[TreeNode]]:
			"""
			Returns the path from the root node to the target node.
			"""

			if root is None:
				return None

			if root.val == target.val:
				return path + [root]

			if root.left:
				left_path = get_path(root.left, target, path + [root])

				if left_path is not None:
					return left_path

			if root.right:
				right_path = get_path(root.right, target, path + [root])

				if right_path is not None:
					return right_path

		# Get paths to both nodes.
		p_path = get_path(root, p, [])
		q_path = get_path(root, q, [])

		# Determine common ancestors.
		common_ancestors = set(p_path).intersection(q_path) 

		# Return the first common ancestor.
		for node in reversed(p_path):
			if node in common_ancestors:
				return node
