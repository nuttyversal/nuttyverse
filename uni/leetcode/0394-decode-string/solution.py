class Solution:
	def decodeString(self, s: str) -> str:
		# Stack of operations (postfix).
		# E.g. 3[a2[c]] to [*, 3, +, a, *, 2, +, c]
		operations = []

		# `s` pointer.
		cursor = 0

		while cursor < len(s):
			if s[cursor].isalpha():
				substring = ""

				while cursor < len(s) and s[cursor].isalpha():
					substring += s[cursor]
					cursor += 1

				operations.append("+")
				operations.append(substring)

			elif s[cursor].isdigit():
				repeat = ""

				while cursor < len(s) and s[cursor].isdigit():
					repeat += s[cursor]
					cursor += 1

				operations.append("*")
				operations.append(int(repeat))

			elif s[cursor] == "[":
				cursor += 1

			elif s[cursor] == "]":
				cursor += 1

				# Evaluate the innermost *.
				substring = ""

				while True:
					operand = operations.pop()
					operation = operations.pop()

					if operation == "+":
						substring = operand + substring
					elif operation == "*":
						substring = operand * substring
						break

				operations.append("+")
				operations.append(substring)

		# The stack is reduced to a sum of substrings during parsing.
		decoded_string = "".join(filter(lambda x: x != "+", operations))

		return decoded_string
