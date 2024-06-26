class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next


class Solution:
	def pairSum(self, head: Optional[ListNode]) -> int:
		# Collect elements in linked list.
		elements = []
		current = head
		length = 0

		while current is not None:
			elements.append(current.val)
			current = current.next
			length += 1

		# Zip the twins together.
		left = elements[0 : length // 2]
		right = elements[length // 2 : length + 1]
		twins = zip(left, reversed(right))

		# Sum the twins and find the max.
		max_twin_sum = max(map(sum, twins))

		return max_twin_sum
