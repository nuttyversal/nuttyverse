class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next


class Solution:
	def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
		# A list of odd, and a list of even.
		odd_head = None
		odd_tail = None
		even_head = None
		even_tail = None

		# Separate the list into odd and even.
		current = head
		index = 0

		while current is not None:
			# For some reason, the first node is considered odd.
			if index % 2 == 0:				
				if odd_head is None:
					odd_head = current

				if odd_tail is not None:
					odd_tail.next = current

				odd_tail = current
			else:
				if even_head is None:
					even_head = current

				if even_tail is not None:
					even_tail.next = current

				even_tail = current

			# Update pointer to next node.
			current = current.next
			index += 1

		# Concatenate odd and even lists.
		if odd_tail is not None:
			odd_tail.next = even_head

		if even_tail is not None:
			even_tail.next = None

		return odd_head
