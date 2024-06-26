class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
		def traverse(node: Optional[TreeNode], sequence: List[int]):
			if node.left is not None:
				traverse(node.left, sequence)

			if node.left is None and node.right is None:
				sequence.append(node.val)

			if node.right is not None:
				traverse(node.right, sequence)

			return sequence

		sequence1 = traverse(root1, [])
		sequence2 = traverse(root2, [])

		return sequence1 == sequence2
