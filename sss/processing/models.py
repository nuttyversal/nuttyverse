import io
import typing


class CompressionResult(typing.TypedDict):
	original_bytes: io.BytesIO
	original_size: int
	compressed_bytes: io.BytesIO
	compressed_size: int
