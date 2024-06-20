class Solution:
	def maxDistance(self, position: List[int], m: int) -> int:
		sorted_positions = sorted(position)
		max_min_force = 0

		# Binary search over magnetic force space.
		left = 1
		right = sorted_positions[-1] - sorted_positions[0]

		while left <= right:
			# Next possible candidate.
			min_force = (left + right) // 2

			# Fix the first ball in the first basket. This is acceptable,
			# but I imagine that this greedy approach would only find the
			# local minimum in the space of distributions where the first
			# ball is fixed to sorted_positions[0]. Hmmm... 🤔
			last_ball = sorted_positions[0]

			# Does this magnetic force exist in the distribution?
			min_force_exists = False
			balls = m - 1

			# Does there exist a distribution?
			for p in sorted_positions:
				if balls == 0:
					break

				if p - last_ball == min_force:
					min_force_exists = True
					last_ball = p
					balls -= 1
				elif p - last_ball > min_force:
					last_ball = p
					balls -= 1

			# Cut the search space.
			if balls > 0:
				right = min_force - 1
			else:
				left = min_force + 1

			# Update the maximum minimum magnetic force.
			if balls == 0 and min_force_exists:
				max_min_force = max(max_min_force, min_force)

		return max_min_force
