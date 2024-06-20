class Solution:
	def uniqueOccurrences(self, arr: List[int]) -> bool:
		occ = {}

		for n in arr:
			if n not in occ:
				occ[n] = 1
			else:
				occ[n] += 1

		unique_vals = set(occ.keys())
		unique_occ = set(occ.values())

		return len(unique_vals) == len(unique_occ)
