class Solution:
	def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
		# How customers are satisfied by default?
		satisfied_without_technique = 0

		# O(n)
		for minute in range(len(customers)):
			if grumpy[minute] == 0:
				satisfied_without_technique += customers[minute]

		# How many additional customers can we satisfy using the secret
		# technique to suppress the grumpies?
		customers_when_grumpy = []

		# O(n)
		for minute in range(len(customers)):
			if grumpy[minute] == 1:
				customers_when_grumpy.append(customers[minute])
			else:
				customers_when_grumpy.append(0)
		
		# Sliding window.
		left = 0
		right = minutes

		# Satisfaction counter.
		satisfied_with_technique = sum(customers_when_grumpy[left : right])
		max_satisfied_with_technique = satisfied_with_technique

		# O(n)
		for minute in range(right, len(customers_when_grumpy)):
			satisfied_with_technique -= customers_when_grumpy[left]
			satisfied_with_technique += customers_when_grumpy[minute]

			if satisfied_with_technique > max_satisfied_with_technique:
				max_satisfied_with_technique = satisfied_with_technique

			left += 1
			right += 1

		return satisfied_without_technique + max_satisfied_with_technique
