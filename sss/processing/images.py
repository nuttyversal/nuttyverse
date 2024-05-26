import datetime
import io
import typing

from PIL import Image
from pillow_heif import register_heif_opener

import processing.models


# Extend Pillow to support HEIF images.
register_heif_opener()


def read_image_tags(image: io.BytesIO) -> typing.Dict[int, typing.Any]:
	"""
	Reads the EXIF tags from an image and returns them as a dictionary.
	If the image has no EXIF tags, an empty dictionary is returned.
	"""

	try:
		image.seek(0)
		image = Image.open(image)
		return image.getexif()
	except Exception:
		return dict()


def parse_creation_timestamp(image: io.BytesIO) -> typing.Optional[datetime.datetime]:
	"""
	Parses the date and time from an image and returns it as a datetime object.
	If the image has no date and time, None is returned.
	"""

	tags = read_image_tags(image)

	if tags is None:
		return None

	# The date and time are stored in tag 306.
	# See https://exiv2.org/tags.html.
	date_time_tag = tags.get(306)

	if date_time_tag is None:
		return None

	return datetime.datetime.strptime(date_time_tag, "%Y:%m:%d %H:%M:%S")


def process_image(data: io.BytesIO) -> processing.models.ProcessingResult:
	"""
	Compresses an image using the WebP format and returns the result.
	This will also strip any metadata from the image.
	"""

	# Open the image and save it as WebP.
	data.seek(0)
	image = Image.open(data)
	output = io.BytesIO()
	image.save(output, "WEBP", quality=80, method=6)
	output.seek(0)

	# Parse the date and time from the image.
	timestamp = parse_creation_timestamp(io.BytesIO(data.getvalue()))

	return processing.models.ProcessingResult(
		content_type="image",
		creation_timestamp=timestamp,
		dimensions=image.size,
		original_bytes=data,
		original_size=data.getbuffer().nbytes,
		compressed_bytes=output,
		compressed_size=output.getbuffer().nbytes,
	)


# # Test read_image_tags by loading an image and printing its tags.
# with open("/Users/nutty/Downloads/test_output.webp", "rb") as f:
# 	tags = read_image_tags(io.BytesIO(f.read()))
# 	print(tags)

# # Test parse_datetime by loading an image and printing its date.
# with open("/Users/nutty/Downloads/test_output.webp", "rb") as f:
# 	date = parse_creation_timestamp(io.BytesIO(f.read()))
# 	print(date)

# # Test convert_to_webp by loading an image and saving it as WebP.
# with open("/Users/nutty/Downloads/IMG_2301.HEIC", "rb") as f:
# 	result = process_image(io.BytesIO(f.read()))

# 	with open("/Users/nutty/Downloads/test_output2.webp", "wb") as f:
# 		f.write(result["compressed_bytes"].read())

# 	# Print compression statistics.
# 	print(result["original_size"], result["compressed_size"])
# 	print(result["dimensions"])
