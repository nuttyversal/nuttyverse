import datetime
import io
import typing

from minio import Minio
import psycopg2
import psycopg2.extras
import psycopg2.extensions
import uuid_utils

import client.errors
import client.models


def store_object(minio: Minio, database: psycopg2.extensions.connection, bucket_name: str, object_name: str, data: io.BytesIO, content_type: str | None) -> client.models.StoreObjectResult:
	"""
	Store an object in the object storage service and record its metadata in the database.
	"""

	object_id = str(uuid_utils.uuid7())

	with database.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
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
		database.commit()

	data.seek(0)

	minio.put_object(
		bucket_name=bucket_name,
		object_name=object_name,
		data=data,
		length=data.getbuffer().nbytes,
		content_type=content_type,
	)

	return client.models.StoreObjectResult(
		object_id=object_id if result["inserted"] else result["id"],
		inserted=result["inserted"],
	)

def delete_object(minio: Minio, database: psycopg2.extensions.connection, id: str):
	"""
	Delete an object from the object storage service and remove its metadata from the database.
	"""

	with database.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
		select_query = """
			SELECT bucket_name, object_name
			FROM objects
			WHERE id = %s
		"""

		cursor.execute(select_query, (id,))
		result = cursor.fetchone()

		if not result:
			raise client.errors.ObjectNotFoundError("Object does not exist.")

		bucket_name = result["bucket_name"]
		object_name = result["object_name"]

	with database:
		with database.cursor() as cursor:
			delete_query = """
				DELETE FROM objects
				WHERE id = %s
			"""

			cursor.execute(delete_query, (id,))
			database.commit()

		minio.remove_object(
			bucket_name=bucket_name,
			object_name=object_name,
		)

def list_objects(database: psycopg2.extensions.connection, bucket_name: str) -> typing.List[client.models.SpaceshipObject]:
	"""
	List all objects in a bucket.
	"""

	with database.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
		select_query = """
			SELECT id, created_at, updated_at, bucket_name, object_name
			FROM objects
			WHERE bucket_name = %s
		"""

		cursor.execute(select_query, (bucket_name,))
		result = cursor.fetchall()

	return result


def upload_media(database: psycopg2.extensions.connection, media_id: str, captured_at: datetime.datetime, original_object_id: str, compressed_object_id: str, width: int, height: int, description: str) -> None:
	"""
	Upload media metadata to the database.
	"""

	with database.cursor() as cursor:
		query = """
			INSERT INTO media (id, captured_at, original_object_id, compressed_object_id, width, height, description)
			VALUES (%s, %s, %s, %s, %s, %s, %s)
		"""

		values = (media_id, captured_at, original_object_id, compressed_object_id, width, height, description)
		cursor.execute(query, values)
		database.commit()
