class Solution:
	def moveZeroes(self, nums: List[int]) -> None:
		"""
		Do not return anything, modify nums in-place instead.
		"""

		for i in range(len(nums)):
			for j in range(i, len(nums)):
				if nums[i] == 0:
					# Bubble to the right.
					temp = nums[j]
					nums[j] = nums[i]
					nums[i] = temp
