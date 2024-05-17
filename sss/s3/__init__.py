import os

from minio import Minio
from minio.error import S3Error


def create_minio_client() -> Minio:
	if os.environ.get("MINIO_ENDPOINT", None) is None:
		raise MissingVariableException("MinIO endpoint not specified.")

	if os.environ.get("MINIO_REGION", None) is None:
		raise MissingVariableException("MinIO region not specified.")

	if os.environ.get("MINIO_ACCESS_KEY") is None:
		raise MissingVariableException("MinIO access key not specified.")

	if os.environ.get("MINIO_SECRET_KEY") is None:
		raise MissingVariableException("MinIO secret key not specified.")

	return Minio(
		os.environ["MINIO_ENDPOINT"],
		region=os.environ["MINIO_REGION"],
		access_key=os.environ["MINIO_ACCESS_KEY"],
		secret_key=os.environ["MINIO_SECRET_KEY"],
	)


if __name__ == "__main__":
	client = create_minio_client()
	print(client)
