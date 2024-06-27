class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
		def search(node: Optional[TreeNode], target: int) -> Optional[TreeNode]:
			if node is None:
				return None

			if node.val == target:
				return node

			if node.left and target < node.val:
				return search(node.left, target)

			if node.right and target > node.val:
				return search(node.right, target)

		return search(root, val)
