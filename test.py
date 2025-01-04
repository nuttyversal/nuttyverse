import random

# Original characters (U+16A0 -> U+16EA)
runic_characters = ["ᚠ", "ᚡ", "ᚢ", "ᚣ", "ᚤ", "ᚥ", "ᚦ", "ᚧ", "ᚨ", "ᚩ", "ᚪ", "ᚫ", "ᚬ", "ᚭ", "ᚮ", "ᚯ", "ᚰ", "ᚱ", "ᚲ", "ᚳ", "ᚴ", "ᚵ", "ᚶ", "ᚷ", "ᚸ", "ᚹ", "ᚺ", "ᚻ", "ᚼ", "ᚽ", "ᚾ", "ᚿ", "ᛀ", "ᛁ", "ᛂ", "ᛃ", "ᛄ", "ᛅ", "ᛆ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛋ", "ᛌ", "ᛍ", "ᛎ", "ᛏ", "ᛐ", "ᛑ", "ᛒ", "ᛓ", "ᛔ", "ᛕ", "ᛖ", "ᛗ", "ᛘ", "ᛙ", "ᛚ", "ᛛ", "ᛜ", "ᛝ", "ᛞ", "ᛟ", "ᛠ", "ᛡ", "ᛢ", "ᛣ", "ᛤ", "ᛥ", "ᛦ", "ᛧ", "ᛨ", "ᛩ", "ᛪ"]

# Runic symbols (U+16EE -> U+16F8)
additional_runic_characters = ["ᛮ", "ᛯ", "ᛰ", "ᛱ", "ᛲ", "ᛳ", "ᛴ", "ᛵ", "ᛶ", "ᛷ", "ᛸ"]

# All runes
runes = runic_characters + additional_runic_characters

single_line_output = ""
multi_line_output = ""

for i in range(21):
	single_line_output = single_line_output + random.choice(runes)
	multi_line_output = multi_line_output + random.choice(runes)

	if (i + 1) % 7 == 0 and i != 20:
		single_line_output = single_line_output + "᛬"
		multi_line_output = multi_line_output + "\n"

print(len(runes))
print(f"{multi_line_output}\n")
print(f"https://id.nuttyver.se/{single_line_output}\n")
print("018ed335-6f02-73ca-b05c-caa94cc604c9")

# https://id.nuttyver.se/ᚮᛰᛎᚾᚯᚯᛰ
