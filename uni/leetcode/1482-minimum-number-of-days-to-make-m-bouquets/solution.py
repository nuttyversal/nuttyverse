class Solution:
	def minDays(self, bloomDay: List[int], m: int, k: int) -> int:
		# Minimum number of days to wait.
		min_days = -1

		# Pre-condition: Do we even have enough flowers?
		if m * k > len(bloomDay):
			return min_days

		# Instead of iterating from 0 to max(bloomDay), iterate through
		# the values that actually exist in the list.
		distinct_bloom_days = sorted(list(set(bloomDay)))

		# And since distinct_bloom_days is sorted, we can perform a binary
		# search instead of a linear search.
		left = 0
		right = len(distinct_bloom_days) - 1

		while left <= right:
			middle = (left + right) // 2
			today = distinct_bloom_days[middle]

			# A group represents a number of adjacent flowers that have
			# bloomed. All groups are disjoint from each other. We want
			# to collect the lengths of all the groups to determine how
			# many bouquets we can make today.
			all_groups = []
			current_group = 0

			for bloom_day in bloomDay:
				if today >= bloom_day:
					current_group += 1
				else:
					all_groups.append(current_group)
					current_group = 0

			all_groups.append(current_group)

			# How many bouquets can we make?
			bouquets = 0

			for group in all_groups:
				bouquets += group // k

			if bouquets < m:
				# We still need to wait more time.
				left = middle + 1
			else:
				# Perhaps we can wait less time.
				min_days = today
				right = middle - 1

		return min_days
