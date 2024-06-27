class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right


class Solution:
	def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
		def shift(root, parent, node, successor) -> Optional[TreeNode]:
			"""
			Update the node's parent to point to the node's successor.
			Returns the (possibly new) root of the tree.
			"""

			if parent is None:
				return successor

			if node == parent.left:
				parent.left = successor
				return root

			if node == parent.right:
				parent.right = successor
				return root

		def smallest(node: TreeNode, parent: TreeNode) -> TreeNode:
			"""
			Pops the smallest node from the tree rooted at node.
			"""

			if node.left is None:
				if node == parent.left:
					parent.left = None
				else:
					parent.right = None

				return node

			return smallest(node.left, node)

		def delete(root, node, key, parent = None) -> Optional[TreeNode]:
			"""
			Delete the node with the key from the BST. Returns the
			(possibly new) root of the tree.
			"""

			# Key does not exist in tree.
			if node is None:
				return root

			# Found key! Delete the node.
			if node.val == key:
				if node.left is None:
					return shift(root, parent, node, node.right)
				elif node.right is None:
					return shift(root, parent, node, node.left)
				else:
					# If the deleted node contains two children, then the
					# successor to the deleted node will be the smallest node
					# in the right subtree.
					successor = smallest(node.right, node)
					successor.left = node.left

					if successor.right is None:
						successor.right = node.right
					else:
						# LOL, this absolutely shifts the center of gravity on
						# this BST. I'm glad that this problem doesn't expect
						# the BST to be balanced.
						rightmost = successor.right

						while rightmost.right is not None:
							rightmost = rightmost.right

						rightmost.right = node.right

					return shift(root, parent, node, successor)

			# Continue search.
			if node.left and key < node.val:
				return delete(root, node.left, key, node)
			else:
				return delete(root, node.right, key, node)

		return delete(root, root, key)
