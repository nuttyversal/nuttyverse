class Solution:
	def numberOfSubarrays(self, nums: List[int], k: int) -> int:
		last_left = -1
		left = 0

		if nums[left] % 2 == 1:
			odd_numbers = 1
		else:
			odd_numbers = 0

		if k == 1 and odd_numbers == 1:
			nice_subarrays = 1
		else:
			nice_subarrays = 0

		for right in range(1, len(nums)):
			# Extend right side.
			if nums[right] % 2 == 1:
				odd_numbers += 1

			# Shrink left side.
			if odd_numbers > k:
				last_left = left

			while odd_numbers > k:
				if nums[left] % 2 == 1:
					odd_numbers -= 1
				left += 1

			while left < len(nums) and nums[left] % 2 == 0:
				left += 1

			# Count subarrays.
			if odd_numbers == k:
				nice_subarrays += left - last_left

		return nice_subarrays
