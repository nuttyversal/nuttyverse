import collections


class Solution:
	def maximumImportance(self, n: int, roads: List[List[int]]) -> int:
		# How many roads are connected to each city?
		city_roads = collections.defaultdict(int)

		for [city1, city2] in roads:
			city_roads[city1] += 1
			city_roads[city2] += 1

		# Order cities by number of roads connected.
		city_roads = sorted(city_roads.items(), key = lambda cr: cr[1])

		# Assign importance based on roads connected.
		importance = {}

		for i in range(len(city_roads)):
			offset = n - len(city_roads)
			importance[city_roads[i][0]] = i + offset + 1

		# Find maximum total importance.
		total_importance = 0

		for [city1, city2] in roads:
			total_importance += importance[city1]
			total_importance += importance[city2]

		return total_importance
