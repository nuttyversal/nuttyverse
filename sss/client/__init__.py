import io
import os

from minio import Minio
import psycopg2
import psycopg2.extras
import uuid_utils

import client.errors
import client.models


class SpaceshipStorage:
	def __init__(self):
		if os.environ.get("MINIO_ENDPOINT", None) is None:
			raise client.errors.MissingConfigError("MinIO endpoint not specified.")

		if os.environ.get("MINIO_REGION", None) is None:
			raise client.errors.MissingConfigError("MinIO region not specified.")

		if os.environ.get("MINIO_ACCESS_KEY") is None:
			raise client.errors.MissingConfigError("MinIO access key not specified.")

		if os.environ.get("MINIO_SECRET_KEY") is None:
			raise client.errors.MissingConfigError("MinIO secret key not specified.")

		self.client = Minio(
			os.environ["MINIO_ENDPOINT"],
			region=os.environ["MINIO_REGION"],
			access_key=os.environ["MINIO_ACCESS_KEY"],
			secret_key=os.environ["MINIO_SECRET_KEY"],
		)

		if os.environ.get("DATABASE_NAME", None) is None:
			raise client.errors.MissingConfigError("Database name not specified.")

		if os.environ.get("DATABASE_USER", None) is None:
			raise client.errors.MissingConfigError("Database user not specified.")

		if os.environ.get("DATABASE_PASSWORD", None) is None:
			raise client.errors.MissingConfigError("Database password not specified.")

		if os.environ.get("DATABASE_HOST", None) is None:
			raise client.errors.MissingConfigError("Database host not specified.")

		if os.environ.get("DATABASE_PORT", None) is None:
			raise client.errors.MissingConfigError("Database port not specified.")

		self.connection = psycopg2.connect(
			dbname=os.environ["DATABASE_NAME"],
			user=os.environ["DATABASE_USER"],
			password=os.environ["DATABASE_PASSWORD"],
			host=os.environ["DATABASE_HOST"],
			port=os.environ["DATABASE_PORT"],
		)

	def store_object(self, bucket_name: str, object_name: str, data: io.BytesIO) -> client.models.StoreObjectResult:
		object_id = str(uuid_utils.uuid7())

		with self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
			query = """
				INSERT INTO objects (id, bucket_name, object_name)
				VALUES (%s, %s, %s)
				ON CONFLICT (bucket_name, object_name)
				DO UPDATE SET
					updated_at = CURRENT_TIMESTAMP
				RETURNING id, (xmax = 0) AS inserted
			"""

			values = (object_id, bucket_name, object_name)
			cursor.execute(query, values)
			result = cursor.fetchone()
			self.connection.commit()

		self.client.put_object(
			bucket_name=bucket_name,
			object_name=object_name,
			data=data,
			length=data.getbuffer().nbytes,
		)

		return client.models.StoreObjectResult(
			object_id=object_id if result["inserted"] else result["id"],
			inserted=result["inserted"],
		)


def test():
	client = SpaceshipStorage()
	store_result = client.store_object("looking-glass", "folder4/message.txt", io.BytesIO(b"hello"))
	print(store_result)
