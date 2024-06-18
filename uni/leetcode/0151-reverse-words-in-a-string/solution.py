import re


class Solution:
	def reverseWords(self, s: str) -> str:
		words = re.split("\W+", s.strip())
		words.reverse()
		reversed_s = " ".join(words)

		return reversed_s
