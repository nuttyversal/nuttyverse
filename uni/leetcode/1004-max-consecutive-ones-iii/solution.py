class Solution:
	def longestOnes(self, nums: List[int], k: int) -> int:
		# Maximum # of consecutive 1's.
		max_cones = 0

		# How many 0's are flipped?
		flipped = 0

		# Window represented as [left, right].
		left = 0
		right = 0

		for i in range(len(nums)):
			# Extend right.
			right = i

			if nums[right] == 0:
				flipped += 1

			# Shrink left.
			while flipped > k:
				if nums[left] == 0:
					flipped -= 1

				left = left + 1

			# Update max.
			cones = right - left + 1
			max_cones = max(max_cones, cones)

		return max_cones
