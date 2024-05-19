import datetime
import typing


class StoreObjectResult(typing.TypedDict):
	object_id: str
	inserted: bool


class SpaceshipObject(typing.TypedDict):
	id: str
	created_at: datetime.datetime
	updated_at: datetime.datetime
	bucket_name: str
	object_name: str
