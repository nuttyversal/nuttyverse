class Solution:
	def gcdOfStrings(self, str1: str, str2: str) -> str:
		gcd = ""

		for i in range(min(len(str1), len(str2))):
			prefix = str1[0 : i + 1]
			is_gcd = True

			# Does prefix divide str1?
			for j in range(0, len(str1), len(prefix)):
				if not is_gcd or str1[j : j + len(prefix)] != prefix:
					is_gcd = False

			# Does prefix divide str2?
			for j in range(0, len(str2), len(prefix)):
				if not is_gcd or str2[j : j + len(prefix)] != prefix:
					is_gcd = False

			if is_gcd:
				gcd = prefix

		return gcd
