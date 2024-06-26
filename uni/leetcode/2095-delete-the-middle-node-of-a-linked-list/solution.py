class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next


class Solution:
	def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
		def length(node: Optional[ListNode]) -> int:
			if node is None:
				return 0
			if node.next is None:
				return 1
			else:
				return length(node.next) + 1

		# O(n): Get the length of the list.
		list_length = length(head)

		# Get the index of the middle node.
		middle = list_length // 2

		# Nodes adjacent to middle node.
		node_before_middle = None
		node_after_middle = None

		# O(n): Traverse the list to get to the middle node.
		current_node = head

		for i in range(middle):
			if i == middle - 1:
				node_before_middle = current_node

			current_node = current_node.next

		node_after_middle = current_node.next

		# Delete middle node.
		del current_node

		# Update pointers and return new list.
		if node_before_middle is None:
			return head.next
		else:
			node_before_middle.next = node_after_middle
			return head
