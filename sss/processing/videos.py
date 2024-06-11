import datetime
import io
import typing
import re
import subprocess
import uuid

import ffmpeg

import processing.models


def parse_creation_timestamp(stderr: str) -> typing.Optional[datetime.datetime]:
	"""
	Parses the creation timestamp from the stderr of an ffmpeg process.
	"""

	# Parse the earliest creation timestamp from the stderr.
	timestamp = None

	for line in stderr.decode().split("\n"):
		if "creation" in line:
			try:
				stderr_lines = line.split(" ")
				format = "%Y-%m-%dT%H:%M:%S.%fZ" if "." in stderr_lines[-1] else "%Y-%m-%dT%H:%M:%S%z"
				parsed_timestamp = datetime.datetime.strptime(stderr_lines[-1], format)

				# If the timestamp has a timezone, convert it to UTC.
				if parsed_timestamp.tzinfo is not None:
					parsed_timestamp = parsed_timestamp.astimezone(datetime.timezone.utc).replace(tzinfo=None)

				# If the timestamp is earlier than the current timestamp, update it.
				if timestamp is None or parsed_timestamp < timestamp:
					timestamp = parsed_timestamp

			except ValueError:
				continue

	return timestamp


def parse_video_dimensions(stderr: str, target_width: int) -> typing.Tuple[int, int]:
	"""
	Parses the dimensions of a video from the stderr of an ffmpeg process.
	"""

	# Parse the dimensions from the stderr.
	for line in stderr.decode().split("\n"):
		if "Stream" in line and "Video" in line:
			try:
				# Limit search to 3 or 4 digits to avoid matching hex values.
				dimensions = re.search(r"\d{3,4}x\d{3,4}", line).group()
				width, height = map(int, dimensions.split("x"))

				if width == target_width:
					return width, height

			except (IndexError, ValueError):
				continue

	return 0, 0


def process_video(data: io.BytesIO) -> processing.models.ProcessingResult:
	"""
	Compresses an image using the WebM format and returns the result.
	"""

	# Generate path to the temporary file.
	filename = f"/tmp/{str(uuid.uuid4())}.mov"

	# Save the video data to a temporary file. For some file formats, ffmpeg
	# needs to seek back and forth in the file, which is not possible when
	# streaming to stdin.
	with open(filename, "wb") as f:
		f.write(data.read())
	
	# Compress the video using ffmpeg (scaled to 1024 pixel width).
	compression_process = (
		ffmpeg
		.input(filename)
		.output("pipe:", format="webm", vcodec="libvpx-vp9", acodec="libvorbis", vf="scale=1024:-1")
		.run_async(pipe_stdout=True, pipe_stderr=True)
	)

	# Generate a preview of the video (scaled to 32 pixel width).
	preview_process = (
		ffmpeg
		.input(filename)
		.output("pipe:", format="webm", vcodec="libvpx-vp9", acodec="libvorbis", vf="scale=32:-1")
		.run_async(pipe_stdout=True, pipe_stderr=True)
	)

	# Read the compressed video from the process.
	compressed_output = io.BytesIO()
	for chunk in compression_process.stdout:
		compressed_output.write(chunk)

	# Read the preview video from the process.
	preview_output = io.BytesIO()
	for chunk in preview_process.stdout:
		preview_output.write(chunk)

	# Wait for the process to finish.
	compression_process.wait()
	preview_process.wait()

	# Remove the temporary file.
	subprocess.run(["rm", filename])

	# Read stderr text from the process.
	_, stderr = compression_process.communicate()

	# Parse the creation timestamp from stderr.
	timestamp = parse_creation_timestamp(stderr)

	# Parse the dimensions from stderr.
	width, height = parse_video_dimensions(stderr, target_width=1024)

	return processing.models.ProcessingResult(
		content_type="video",
		creation_timestamp=timestamp,
		dimensions=(width, height),
		original_bytes=data,
		original_size=data.getbuffer().nbytes,
		compressed_bytes=compressed_output,
		compressed_size=compressed_output.getbuffer().nbytes,
		preview_bytes=preview_output,
		preview_size=preview_output.getbuffer().nbytes,
	)
