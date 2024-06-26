class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def balanceBST(self, root: TreeNode) -> TreeNode:
		# O(n): Perform in-order traversal.
		def traverse(node: TreeNode, values: List = []) -> List[int]:
			if node.left is not None:
				traverse(node.left, values)

			values.append(node.val)

			if node.right is not None:
				traverse(node.right, values)

			return values

		# O(n): Recreate the binary search tree in balanced manner.
		def create_tree(values: List[int]) -> TreeNode:
			if len(values) == 0:
				return None

			middle = len(values) // 2
			val = values[middle]
			left = create_tree(values[0 : middle])
			right = create_tree(values[middle + 1 : len(values)])

			return TreeNode(val, left, right)

		return create_tree(traverse(root))
