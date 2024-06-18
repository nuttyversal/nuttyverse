class Solution:
	def mergeAlternately(self, word1: str, word2: str) -> str:
		merged_word = ""

		if len(word1) > len(word2):
			longest_word = word1
			shortest_word = word2
		else:
			longest_word = word2
			shortest_word = word1

		for i in range(len(shortest_word)):
			merged_word += word1[i]
			merged_word += word2[i]

		merged_word += longest_word[len(shortest_word):]

		return merged_word

