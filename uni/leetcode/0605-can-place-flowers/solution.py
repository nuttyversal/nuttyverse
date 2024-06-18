class Solution:
	def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
		planted_plots = [
			# Collect the indices of the plots...
			i for i in range(len(flowerbed))

			# ...that are currently planted.
			if flowerbed[i] == 1 
		]

		# Add imaginery markers to left and right side of flowerbed.
		planted_plots = [-2] + planted_plots + [len(flowerbed) + 1]

		# How many flowers can we plant?
		open_plots = 0

		for i in range(len(planted_plots) - 1):
			p1 = planted_plots[i]
			p2 = planted_plots[i + 1]
			delta = p2 - p1

			# Max number of flowers that can be planted between
			# p1 = planted_plots[i] and p2 = planted_plots[i + 1]
			# is (p2 - p1 - 2) // 2.
			#
			# Δ = 0: 1 => 0
			# Δ = 1: 1 1 => 0
			# Δ = 2: 1 0 1 => 0
			# Δ = 3: 1 0 0 1 => 0
			# Δ = 4: 1 0 0 0 1 => 1
			# Δ = 5: 1 0 0 0 0 1 => 1
			# Δ = 6: 1 0 0 0 0 0 1 => 2
			# Δ = 7: 1 0 0 0 0 0 0 1 => 2
			# Δ = 8: 1 0 0 0 0 0 0 0 1 => 3
			# Δ = 9: 1 0 0 0 0 0 0 0 0 1 => 3
			open_plots += (delta - 2) // 2

		return open_plots >= n
