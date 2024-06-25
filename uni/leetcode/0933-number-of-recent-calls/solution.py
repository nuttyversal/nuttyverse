import collections


class RecentCounter:

	def __init__(self):
		self.pings = collections.deque()

	def ping(self, t: int) -> int:
		self.pings.append(t)

		while t - self.pings[0] > 3000:
			self.pings.popleft()

		return len(self.pings)


# Your RecentCounter object will be instantiated and called as such:
# obj = RecentCounter()
# param_1 = obj.ping(t)
