class Solution:
	def findMaxAverage(self, nums: List[int], k: int) -> float:
		window_sum = sum(nums[0 : k])
		max_average = window_sum / k

		for i in range(1, len(nums) + 1 - k):
			window_sum -= nums[i - 1]
			window_sum += nums[i + k - 1]
			average = window_sum / k

			if average > max_average:
				max_average = average

		return max_average
