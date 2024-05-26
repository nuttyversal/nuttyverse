import os

from flask import g
from minio import Minio
import psycopg2
import psycopg2.extras

import client.errors


def get_database():
	"""
	Returns a connection to the database. The connection is stored in the Flask
	global object `g` so that it can be reused across requests.
	"""

	if "database" not in g:
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

		g.database = psycopg2.connect(
			dbname=os.environ["DATABASE_NAME"],
			user=os.environ["DATABASE_USER"],
			password=os.environ["DATABASE_PASSWORD"],
			host=os.environ["DATABASE_HOST"],
			port=os.environ["DATABASE_PORT"],
		)

	return g.database


def close_database():
	"""
	Closes the connection to the database. This should be called at the end of
	each request to ensure that the connection is properly closed.
	"""

	if "database" in g:
		g.database.close()
		g.pop("database")


def get_minio_client():
	"""
	Returns a MinIO client for interacting with the object storage service.
	"""

	if os.environ.get("MINIO_ENDPOINT", None) is None:
		raise client.errors.MissingConfigError("MinIO endpoint not specified.")

	if os.environ.get("MINIO_REGION", None) is None:
		raise client.errors.MissingConfigError("MinIO region not specified.")

	if os.environ.get("MINIO_ACCESS_KEY") is None:
		raise client.errors.MissingConfigError("MinIO access key not specified.")

	if os.environ.get("MINIO_SECRET_KEY") is None:
		raise client.errors.MissingConfigError("MinIO secret key not specified.")

	return Minio(
		os.environ["MINIO_ENDPOINT"],
		region=os.environ["MINIO_REGION"],
		access_key=os.environ["MINIO_ACCESS_KEY"],
		secret_key=os.environ["MINIO_SECRET_KEY"],
	)
