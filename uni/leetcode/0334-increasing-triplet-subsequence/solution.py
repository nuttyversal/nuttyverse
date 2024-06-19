class Solution:
	def increasingTriplet(self, nums: List[int]) -> bool:
		"""
		Time complexity: O(n)
		Space complexity: O(n)

		This is actually disgusting, but it runs in O(n), so I'm happy.
		Way more convoluted than the solution that runs in O(1) space,
		but ¯\_(ツ)_/¯, it got accepted.
		"""

		if len(nums) < 3:
			return False

		# O(n): The minimum value of nums[0 : n] is min_at_n[n - 1].
		min_at_n = [nums[0]]

		for n in nums[1:]:
			min_at_n.append(min(min_at_n[-1], n))

		# O(n): Find (j, k) such that j < k and nums[j] < nums[k]
		# and ∃i such that i < j and nums[i] < nums[j].
		j = 1

		for k in range(2, len(nums)):
			# We found a valid triplet!
			if min_at_n[j - 1] < nums[j] < nums[k]:
				return True

			# [NOTE] I'm skeptical about this part.
			if min_at_n[k - 1] < nums[k]:
				j = k

		return False
