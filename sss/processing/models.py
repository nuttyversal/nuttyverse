import datetime
import io
import typing


class ProcessingResult(typing.TypedDict):
	content_type: typing.Literal["image", "video"]
	creation_timestamp: typing.Optional[datetime.datetime]
	dimensions: typing.Tuple[int, int]
	original_bytes: io.BytesIO
	original_size: int
	compressed_bytes: io.BytesIO
	compressed_size: int
	preview_bytes: io.BytesIO
	preview_size: int
