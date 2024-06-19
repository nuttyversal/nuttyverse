class Solution:
	def maxArea(self, height: List[int]) -> int:
		max_area = 0
		left = 0
		right = len(height) - 1

		while left <= right:
			c_width = right - left
			c_height = min(height[left], height[right])
			area = c_width * c_height
			
			if area > max_area:
				max_area = area

			if height[left] < height[right]:
				left += 1
			else:
				right -= 1

		return max_area
