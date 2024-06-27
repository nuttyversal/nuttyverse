class Solution:
	def findCenter(self, edges: List[List[int]]) -> int:
		# Pick any two edges in star graph.
		v1 = set(edges[0])
		v2 = set(edges[1])

		# The center exists as a vertex on every edge.
		return v1.intersection(v2).pop()
