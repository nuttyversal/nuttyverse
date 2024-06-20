class Solution:
	def removeStars(self, s: str) -> str:
		stack = []

		for c in s:
			if c.isalpha():
				stack.append(c)
			if c == "*":
				stack.pop()

		return "".join(stack)
