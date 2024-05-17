import minio
import os

from s3.exceptions import MissingVariableException


def create_minio_client() -> minio.Minio:
	if os.environ.get("MINIO_ENDPOINT", None) is None:
		raise MissingVariableException("MinIO endpoint not specified.")

	if os.environ.get("MINIO_ACCESS_KEY") is None:
		raise MissingVariableException("MinIO access key not specified.")

	if os.environ.get("MINIO_SECRET_KEY") is None:
		raise MissingVariableException("MinIO secret key not specified.")

	return minio.Minio(
		os.environ["MINIO_ENDPOINT"],
		os.environ["MINIO_ACCESS_KEY"],
		os.environ["MINIO_SECRET_KEY"],
	)


if __name__ == "__main__":
	client = create_minio_client()
	print(client)
