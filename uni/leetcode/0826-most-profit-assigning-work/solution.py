def get_difficulty(job: tuple[int, int]) -> int:
	return job[0]


def get_profit(job: tuple[int, int]) -> int:
	return job[1]


class Solution:
	def findSweetSpot(self, jobs, ability):
		"""
		Time complexity: O(log n)

		Binary search time! Rather than returning the index of an
		existing element in the list, we want to return the index
		of the job, i, where job[n] <= ability < job[n + 1] for
		all n in [0, i].
		"""

		left = 0
		right = len(jobs) - 1

		while left <= right:
			middle = (left + right) // 2	

			if get_difficulty(jobs[middle]) <= ability:
				if middle == len(jobs) - 1 or get_difficulty(jobs[middle + 1]) > ability:
					return middle
				else:
					left = middle + 1
			elif get_difficulty(jobs[middle]) > ability:
				right = middle - 1

		return None

	def maxProfitAssignment(self, difficulty: List[int], profit: List[int], worker: List[int]) -> int:
		"""
		Time complexity: O(n log n + m log n)
		"""

		# Associate difficulty with profit.
		jobs = list(zip(difficulty, profit))

		# O(n log n): Sort jobs by difficulty.
		jobs = sorted(jobs, key=get_difficulty)

		# O(n): Pre-compute maximum profit for each difficulty.
		for i in range(1, len(jobs)):
			max_profit = max(get_profit(jobs[i]), get_profit(jobs[i - 1]))
			jobs[i] = (get_difficulty(jobs[i]), max_profit)

		# What is the maximum profit yield from the optimal assignment?
		total_max_profit = 0

		# O(m log n): Find maximum profit for each worker.
		for ability in worker:

			# O(log n): Find highest difficulty job for worker.
			i = self.findSweetSpot(jobs, ability)

			if i is not None:
				total_max_profit += get_profit(jobs[i])

		return total_max_profit
