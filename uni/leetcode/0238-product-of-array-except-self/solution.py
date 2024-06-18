class Solution:
	def productExceptSelf(self, nums: List[int]) -> List[int]:
		# O(n): Accumulate product from left-to-right.
		product_ltr = [1]
		
		for n in nums:
			product_ltr.append(product_ltr[-1] * n)

		# O(n): Accumulate product from right-to-left.
		product_rtl = [1]

		for n in reversed(nums):
			product_rtl.append(product_rtl[-1] * n)

		product_rtl.reverse()

		# O(n): Compute product of array except self.
		answer = []

		for i in range(len(nums)):
			answer.append(product_ltr[i] * product_rtl[i + 1])

		return answer
