class Solution:
	def maxOperations(self, nums: List[int], k: int) -> int:
		# Max operations that can be performed on the array.
		max_ops = 0

		# Distinct numbers in the list.
		distinct_nums = sorted(list(set(nums)))

		# How many of each number are in the list?
		nums_bag = {}

		for num in nums:
			if num not in nums_bag:
				nums_bag[num] = 1
			else:
				nums_bag[num] += 1

		# How many times can we remove k-sum pairs?
		for i in distinct_nums:
			if i > k // 2:
				break

			# k == i + j
			j = k - i

			if i == j:
				while nums_bag.get(i, 0) >= 2:
					nums_bag[i] -= 1
					nums_bag[j] -= 1
					max_ops += 1
			else:
				while nums_bag.get(i, 0) >= 1 and nums_bag.get(j, 0) >= 1:
					nums_bag[i] -= 1
					nums_bag[j] -= 1
					max_ops += 1

		return max_ops
