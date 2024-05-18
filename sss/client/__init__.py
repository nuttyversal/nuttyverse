import io
import os

from minio import Minio
import psycopg2


class SpaceshipStorage:
	def __init__(self):
		if os.environ.get("MINIO_ENDPOINT", None) is None:
			raise MissingConfigError("MinIO endpoint not specified.")

		if os.environ.get("MINIO_REGION", None) is None:
			raise MissingConfigError("MinIO region not specified.")

		if os.environ.get("MINIO_ACCESS_KEY") is None:
			raise MissingConfigError("MinIO access key not specified.")

		if os.environ.get("MINIO_SECRET_KEY") is None:
			raise MissingConfigError("MinIO secret key not specified.")

		self.client = Minio(
			os.environ["MINIO_ENDPOINT"],
			region=os.environ["MINIO_REGION"],
			access_key=os.environ["MINIO_ACCESS_KEY"],
			secret_key=os.environ["MINIO_SECRET_KEY"],
		)

		if os.environ.get("DATABASE_NAME", None) is None:
			raise MissingConfigError("Database name not specified.")

		if os.environ.get("DATABASE_USER", None) is None:
			raise MissingConfigError("Database user not specified.")

		if os.environ.get("DATABASE_PASSWORD", None) is None:
			raise MissingConfigError("Database password not specified.")

		if os.environ.get("DATABASE_HOST", None) is None:
			raise MissingConfigError("Database host not specified.")

		if os.environ.get("DATABASE_PORT", None) is None:
			raise MissingConfigError("Database port not specified.")

		self.connection = psycopg2.connect(
			dbname=os.environ["DATABASE_NAME"],
			user=os.environ["DATABASE_USER"],
			password=os.environ["DATABASE_PASSWORD"],
			host=os.environ["DATABASE_HOST"],
			port=os.environ["DATABASE_PORT"],
		)

	def store_object(self, bucket_name: str, object_name: str, data: io.BytesIO):
		with self.connection.cursor() as cursor:
			cursor.execute("SELECT version()")
			single_row = cursor.fetchone()
			print(f"version: {single_row}")

		self.client.put_object(
			bucket_name=bucket_name,
			object_name=object_name,
			data=data,
			length=data.getbuffer().nbytes,
		)


def test():
	client = SpaceshipStorage()
	client.store_object("looking-glass", "message.txt", io.BytesIO(b"hello"))
