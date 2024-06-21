class Solution:
	def collide(self, state: List[int], asteroid: int) -> List[int]:
		sign = lambda n: 1 if n > 0 else -1
		size = abs

		if len(state) == 0:
			return [asteroid]

		previous = state[-1]
		next = asteroid

		# --> and <-- will explode!
		if sign(previous) == 1 and sign(next) == -1:
			# --> wins!
			if size(previous) > size(next):
				return state

			# <-- wins, and going for the multi-kill!
			elif size(previous) < size(next):
				state.pop()
				return self.collide(state, next)

			# --> and <-- both lose!
			else:
				state.pop()
				return state

		# No collision.
		state.append(next)
		return state

	def asteroidCollision(self, asteroids: List[int]) -> List[int]:
		state = []

		for next in asteroids:
			state = self.collide(state, next)			

		return state
