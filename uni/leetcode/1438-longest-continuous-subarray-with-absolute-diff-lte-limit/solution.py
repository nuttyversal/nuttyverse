import collections


class Solution:
	def longestSubarray(self, nums: List[int], limit: int) -> int:
		# Accumulator.
		longest_subarray = 1

		# Sliding window.
		left = 0
		low = nums[0]
		high = nums[0]
		counter = collections.Counter([nums[0]])

		for right in range(1, len(nums)):
			# Extend right.
			low = min(low, nums[right])
			high = max(high, nums[right])
			counter.update([nums[right]])

			# Update longest subarray length.
			if high - low <= limit:
				longest_subarray = max(longest_subarray, right - left + 1) 

			# Extend left.
			while left < right and high - low > limit:
				counter.subtract([nums[left]])
				counter = +counter

				if nums[left] not in counter:
					low = min(counter.keys())
					high = max(counter.keys())

				left += 1

		return longest_subarray
