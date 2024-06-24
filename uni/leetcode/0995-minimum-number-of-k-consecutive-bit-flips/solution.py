import collections


class Solution:
	def minKBitFlips(self, nums: List[int], k: int) -> int:
		# Keep track of each k-bit flips since (left - k + 1) to derive
		# the state of nums[left] (whether it is 0 or 1).
		queue = collections.deque()

		# Counter for k-bit flips.
		k_bit_flips = 0

		# Sliding window.
		left = 0
		right = k

		# O(n)
		while right <= len(nums):
			# Shrink left to maintain the invariant that all elements to
			# the left of the sliding window have been flipped to 1.
			while left < len(nums) and (nums[left] + len(queue)) % 2 == 1:
				left += 1

				# Shrink queue so that it only contains the last k-bit flips
				# that occurred after (left - k + 1)
				while len(queue) > 0 and queue[0] < left - k + 1:
					queue.popleft()

			# Extend right.
			right = left + k

			# Check window bounds before slicing.
			if right > len(nums):
				break

			# O(1): Perform a (virtual) k-bit flip.
			queue.append(left)
			k_bit_flips += 1

		# O(1): Check if all bits have been flipped to 1.
		if left == len(nums):
			return k_bit_flips
		else:
			# Not possible.
			return -1
