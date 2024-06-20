class Solution:
	def closeStrings(self, word1: str, word2: str) -> bool:
		# Use a dict to collect the number of occurrences of each
		# character in both words.
		bag1 = {}

		for char in word1:
			if char not in bag1:
				bag1[char] = 1
			else:
				bag1[char] += 1

		bag2 = {}

		for char in word2:
			if char not in bag2:
				bag2[char] = 1
			else:
				bag2[char] += 1

		# If both bags are the same, this implies that we can repeatedly
		# swap any two existing characters in one word to attain the
		# other word.
		if bag1 == bag2:
			return True

		# If not, then we will want to find out if we can transform
		# occurrences of an existing character into another existing
		# character to make the bags equal.
		has_same_chars = set(bag1.keys()) == set(bag2.keys())
		is_transformable = sorted(bag1.values()) == sorted(bag2.values())

		if has_same_chars and is_transformable:
			return True

		# The words are not close.
		return False
