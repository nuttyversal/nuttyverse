class Solution:
	def longestSubarray(self, nums: List[int]) -> int:
		# Longest non-empty subarray.
		longest_length = 0

		# How many elements are deleted from subarray?
		# (INVARIANT: must be <= 1)
		elements_deleted = 0

		# Window: [left, right]
		left = 0
		right = 0

		for i in range(len(nums)):
			# Extend right.
			right = i

			if nums[right] == 0:
				elements_deleted += 1

			# Shrink left.
			while elements_deleted > 1:
				left += 1

				if nums[left - 1] == 0:
					elements_deleted -= 1

			# Update longest length.
			current_length = right - left - elements_deleted + 1
			longest_length = max(longest_length, current_length)

		# If no zeroes exist in the array,
		# then we must delete one one.
		if sum(nums) == len(nums):
			longest_length -= 1

		return longest_length
