class Solution:
	def isVowel(self, c: str) -> bool:
		return c in ["a", "e", "i", "o", "u"]

	def maxVowels(self, s: str, k: int) -> int:
		window_vowels = len([c for c in s[0 : k] if self.isVowel(c)])
		max_vowels = window_vowels

		for i in range(1, len(s) + 1 - k):
			if self.isVowel(s[i - 1]):
				window_vowels -= 1

			if self.isVowel(s[i + k - 1]):
				window_vowels += 1

			if window_vowels > max_vowels:
				max_vowels = window_vowels

		return max_vowels
