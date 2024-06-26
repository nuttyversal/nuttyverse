class Solution:
	def predictPartyVictory(self, senate: str) -> str:
		# Remaining senators from each party.
		senators = {
			'R': senate.count('R'),
			'D': senate.count('D'),
		}

		# Ban queue.
		banned_senators = {
			'R': 0,
			'D': 0,
		}

		def opposite(party: str) -> str:
			if party == 'R':
				return 'D'
			else:
				return 'R'

		senate_current_round = senate

		while len(senate_current_round) > 0:
			senate_next_round = []

			for party in senate_current_round:
				# This senator has no rights (was banned).
				if banned_senators[party] > 0:
					banned_senators[party] -= 1
					continue

				# Check victory conditions.
				if senators['R'] == 0:
					return "Dire"
				elif senators['D'] == 0:
					return "Radiant"

				# Ban the next senator.
				banned_senators[opposite(party)] += 1
				senators[opposite(party)] -= 1

				senate_next_round.append(party)

			senate_current_round = senate_next_round
