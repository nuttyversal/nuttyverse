class Solution:
	def pivotIndex(self, nums: List[int]) -> int:
		# Sum of numbers to the left.
		scan_left = [0]

		# Sum of numbers to the right.
		scan_right = []

		# Collect prefix sums.
		scan_acc = 0

		for num in nums:
			scan_acc += num
			scan_left.append(scan_acc)

		scan_acc = 0

		for num in reversed(nums):
			scan_acc += num
			scan_right.append(scan_acc)

		scan_right.reverse()
		scan_right.append(0)

		# Search for the pivot index.
		for i in range(len(nums)):
			if scan_left[i] == scan_right[i + 1]:
				return i

		return -1
