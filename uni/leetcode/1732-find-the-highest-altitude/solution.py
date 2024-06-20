class Solution:
	def largestAltitude(self, gain: List[int]) -> int:
		highest_altitude = 0
		current_altitude = 0

		for altitude_gain in gain:
			current_altitude += altitude_gain
			highest_altitude = max(highest_altitude, current_altitude)

		return highest_altitude
