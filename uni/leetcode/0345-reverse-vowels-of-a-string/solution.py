class Solution:
	def reverseVowels(self, s: str) -> str:
		# Collect indices of vowels in s.
		vowel_indices = []

		for i in range(len(s)):
			if s[i].lower() in ['a', 'e', 'i', 'o', 'u']:
				vowel_indices.append(i)

		# Re-construct s with reversed vowels.
		reversed_s = ""

		for i in range(len(s)):
			if s[i].lower() in ['a', 'e', 'i', 'o', 'u']:
				reversed_s += s[vowel_indices.pop()]
			else:
				reversed_s += s[i]

		return reversed_s
