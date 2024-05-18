import typing


class StoreObjectResult(typing.TypedDict):
	object_id: str
	inserted: bool
