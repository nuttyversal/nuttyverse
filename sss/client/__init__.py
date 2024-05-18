import io
import os

from minio import Minio
from minio.error import S3Error


class SpaceshipStorage:
	def __init__(self):
		if os.environ.get("MINIO_ENDPOINT", None) is None:
			raise MissingVariableException("MinIO endpoint not specified.")

		if os.environ.get("MINIO_REGION", None) is None:
			raise MissingVariableException("MinIO region not specified.")

		if os.environ.get("MINIO_ACCESS_KEY") is None:
			raise MissingVariableException("MinIO access key not specified.")

		if os.environ.get("MINIO_SECRET_KEY") is None:
			raise MissingVariableException("MinIO secret key not specified.")

		self.client = Minio(
			os.environ["MINIO_ENDPOINT"],
			region=os.environ["MINIO_REGION"],
			access_key=os.environ["MINIO_ACCESS_KEY"],
			secret_key=os.environ["MINIO_SECRET_KEY"],
		)

	def store_object(self, bucket_name: str, object_name: str, data: io.BytesIO):
		self.client.put_object(
			bucket_name=bucket_name,
			object_name=object_name,
			data=data,
			length=data.getbuffer().nbytes,
		)


def test():
	client = SpaceshipStorage()
	client.store_object("looking-glass", "message.txt", io.BytesIO(b"hello"))
