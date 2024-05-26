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
	compressed_output = io.BytesIO()
	image.save(compressed_output, "WEBP", quality=80, method=6)
	compressed_output.seek(0)

	# Generate a preview of the image.
	data.seek(0)
	image = Image.open(data)
	image.thumbnail((image.width // 4, image.height // 4))
	preview_output = io.BytesIO()
	image.save(preview_output, "WEBP", quality=0, method=6)
	preview_output.seek(0)

	# Parse the date and time from the image.
	timestamp = parse_creation_timestamp(io.BytesIO(data.getvalue()))

	return processing.models.ProcessingResult(
		content_type="image",
		creation_timestamp=timestamp,
		dimensions=image.size,
		original_bytes=data,
		original_size=data.getbuffer().nbytes,
		compressed_bytes=compressed_output,
		compressed_size=compressed_output.getbuffer().nbytes,
		preview_bytes=preview_output,
		preview_size=preview_output.getbuffer().nbytes,
	)
