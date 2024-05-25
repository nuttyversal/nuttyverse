import datetime
import io
import typing
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
	
	# Compress the video using ffmpeg.
	process = (
		ffmpeg
		.input(filename)
		.output("pipe:", format="webm", vcodec="libvpx-vp9", acodec="libvorbis")
		.run_async(pipe_stdout=True, pipe_stderr=True)
	)

	# Read the compressed video from the process.
	output = io.BytesIO()
	for chunk in process.stdout:
		output.write(chunk)
	
	# Wait for the process to finish.
	process.wait()

	# Remove the temporary file.
	subprocess.run(["rm", filename])

	# Read stderr text from the process.
	_, stderr = process.communicate()

	# Parse the creation timestamp from the stderr.
	timestamp = parse_creation_timestamp(stderr)

	return processing.models.ProcessingResult(
		creation_timestamp=timestamp,
		original_bytes=data,
		original_size=data.getbuffer().nbytes,
		compressed_bytes=output,
		compressed_size=output.getbuffer().nbytes,
	)
	

with open("/Users/nutty/Downloads/IMG_2250.mov", "rb") as f:
	result = process_video(io.BytesIO(f.read()))
	print(result["original_size"], result["compressed_size"])
	print(result["creation_timestamp"])

	with open("/Users/nutty/Downloads/IMG_2250.webm", "wb") as f:
		f.write(result["compressed_bytes"].getvalue())
