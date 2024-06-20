class Solution:
	def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
		# cones => consecutive ones
		max_cones = 0
		cones = 0
		sentinel = 0

		for num in nums + [sentinel]:
			if num == 1:
				cones += 1
			else:
				max_cones = max(max_cones, cones)
				cones = 0
		
		return max_cones
