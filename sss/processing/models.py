import datetime
import io
import typing


class ProcessingResult(typing.TypedDict):
	creation_timestamp: typing.Optional[datetime.datetime]
	original_bytes: io.BytesIO
	original_size: int
	compressed_bytes: io.BytesIO
	compressed_size: int
