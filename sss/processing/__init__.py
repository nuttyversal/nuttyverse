import io

import pylibmagic
import magic

import processing.images
import processing.models
import processing.videos


def process_object(data: io.BytesIO) -> processing.models.ProcessingResult | None:
	"""
	Processes a file object and returns the result.
	"""
	
	mime = magic.Magic(mime=True)
	mime_type = mime.from_buffer(data.read(2048))
	data.seek(0)

	if mime_type.startswith("image"):
		return processing.images.process_image(data)
	elif mime_type.startswith("video"):
		return processing.videos.process_video(data)
	else:
		return None
