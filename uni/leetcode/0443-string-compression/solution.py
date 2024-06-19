class Solution:
	def write(self, chars: List[str], offset: int, group: str, count: int) -> int:
		# Write character.
		chars[offset] = group
		offset += 1

		# Compress multiple characters.
		if count > 1:
			for count_char in list(str(count)):
				chars[offset] = count_char
				offset += 1

		return offset

	def compress(self, chars: List[str]) -> int:
		# Seek pointer / bytes written.
		offset = 0

		# Accumulator.
		group = chars[0]
		count = 0

		for char in chars:
			# Count chars in group.
			if char == group:
				count += 1
			else:
				# Compress group.
				offset = self.write(chars, offset, group, count)

				# Reset group.
				group = char
				count = 1

		# Compress final group.
		offset = self.write(chars, offset, group, count)

		return offset
