import io

import ffmpeg
import subprocess
import uuid

import processing.models


def compress_video(data: io.BytesIO) -> processing.models.CompressionResult:
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
	output = io.BytesIO()
	process = (
		ffmpeg
		.input(filename)
		.output("pipe:", format="webm", vcodec="libvpx-vp9", acodec="libvorbis")
		.run_async(pipe_stdout=True)
	)

	# Read the compressed video from the process.
	for chunk in process.stdout:
		output.write(chunk)
	
	# Wait for the process to finish.
	process.wait()

	# Remove the temporary file.
	subprocess.run(["rm", filename])

	return processing.models.CompressionResult(
		original_bytes=data,
		original_size=data.getbuffer().nbytes,
		compressed_bytes=output,
		compressed_size=output.getbuffer().nbytes,
	)
	

with open("/Users/nutty/Downloads/IMG_2250.mov", "rb") as f:
	result = compress_video(io.BytesIO(f.read()))
	print(result["original_size"], result["compressed_size"])

	with open("/Users/nutty/Downloads/IMG_2250.webm", "wb") as f:
		f.write(result["compressed_bytes"].getvalue())
