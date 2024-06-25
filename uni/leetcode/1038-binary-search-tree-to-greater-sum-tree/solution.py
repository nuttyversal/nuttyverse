class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def bstToGst(self, root: TreeNode) -> TreeNode:
		prefix_sum = []

		def scan_tree(node: TreeNode):
			"""
			DFS over keys in order from greatest to smallest and construct
			the prefix sum.
			"""

			if node.right is not None:
				scan_tree(node.right)

			if len(prefix_sum) > 0:
				prefix_sum.append(prefix_sum[-1] + node.val)
			else:
				prefix_sum.append(node.val)

			if node.left is not None: 
				scan_tree(node.left)

		def rewrite_tree(node: TreeNode):
			"""
			DFS over keys in order from smallest to greatest and rewrite
			the binary search tree into a greater tree.
			"""

			if node.left is not None:
				rewrite_tree(node.left)

			node.val = prefix_sum.pop()

			if node.right is not None:
				rewrite_tree(node.right)

		scan_tree(root)
		rewrite_tree(root)

		return root
