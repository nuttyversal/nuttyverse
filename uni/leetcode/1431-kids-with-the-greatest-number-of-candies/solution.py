class Solution:
	def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
		# Greatest number of candies amonst all the kids (without giving).
		most_candies = max(candies)

		# Which kids will have the greatest number of candies after
		# giving them the extra candies?
		has_most_candies_after_giving = [
			candies[i] + extraCandies >= most_candies
			for i in range(len(candies))
		]

		return has_most_candies_after_giving
