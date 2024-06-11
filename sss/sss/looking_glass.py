import io

from flask import Blueprint, jsonify, request
import uuid_utils

import client
import client.connections
import processing


looking_glass = Blueprint("looking-glass", __name__)


@looking_glass.route("/upload", methods=["POST"])
def upload_object():
	"""
	Upload a media object (image | video) to the Looking Glass service.
	"""

	# Read the description from the request.
	description = request.form.get("description")

	if description is None:
		return jsonify({ "error": "Description is required." }), 400

	# Retrieve the file from the request.
	file = request.files.get("file")

	if file is None:
		return jsonify({ "error": "No file attached." }), 400
	
	if file.filename == "":
		return jsonify({ "error": "No file attached." }), 400
	
	# Compress the file.
	file_bytes = io.BytesIO(file.read())
	processing_result = processing.process_object(file_bytes)

	if processing_result is None:
		return jsonify({ "error": "Unsupported file type." }), 400

	# Store the original and compressed files.
	media_id = str(uuid_utils.uuid7())

	minio = client.connections.get_minio_client()
	database = client.connections.get_database()

	if "." in file.filename:
		original_file_ext = file.filename.split(".")[-1].lower()
	else:
		original_file_ext = ""

	original_object = client.store_object(
		minio=minio,
		database=database,
		bucket_name="looking-glass",
		object_name=f"{media_id}/original.{original_file_ext}",
		data=processing_result["original_bytes"],
		content_type=file.content_type,
	)

	if processing_result["content_type"] == "image":
		processed_file_ext = "webp"
		processed_file_media_type = "image/webp"
	elif processing_result["content_type"] == "video":
		processed_file_ext = "webm"
		processed_file_media_type = "video/webm"

	compressed_object = client.store_object(
		minio=minio,
		database=database,
		bucket_name="looking-glass",
		object_name=f"{media_id}/compressed.{processed_file_ext}",
		data=processing_result["compressed_bytes"],
		content_type=processed_file_media_type,
	)

	preview_object = client.store_object(
		minio=minio,
		database=database,
		bucket_name="looking-glass",
		object_name=f"{media_id}/preview.{processed_file_ext}",
		data=processing_result["preview_bytes"],
		content_type=processed_file_media_type,
	)

	# Record the metadata in the database.
	client.upload_media(
		database=database,
		media_id=media_id,
		captured_at=processing_result["creation_timestamp"],
		original_object_id=original_object["object_id"],
		compressed_object_id=compressed_object["object_id"],
		preview_object_id=preview_object["object_id"],
		width=processing_result["dimensions"][0],
		height=processing_result["dimensions"][1],
		description=description,
	)

	response = {
		"message": "Success!",
		"media_id": media_id,
	}

	return jsonify(response), 200


@looking_glass.route("/reprocess", methods=["POST"])
def reprocess_objects():
	"""
	Reprocess all media objects in the database.
	"""

	result = {
		"processed": 0,
		"errors": [],
	}

	database = client.connections.get_database()

	with database.cursor(cursor_factory=client.psycopg2.extras.RealDictCursor) as cursor:
		select_query = """
			SELECT
				m.id AS media_id,
				o.bucket_name AS bucket_name,
				o.object_name AS object_name,
				o.content_type AS content_type
			FROM
				media m
				INNER JOIN objects o ON m.original_object_id = o.id
			WHERE
				o.bucket_name = 'looking-glass';
		"""

		cursor.execute(select_query)
		records = cursor.fetchall()

	minio = client.connections.get_minio_client()

	for record in records:
		print("Processing media:", record["media_id"])

		try:
			response = minio.get_object(
				bucket_name=record["bucket_name"],
				object_name=record["object_name"],
			)
			object_data = response.read()

		except Exception as e:
			result["errors"].append({
				"media_id": record["media_id"],
				"error": str(e),
			})
			continue

		finally:
			response.close()
			response.release_conn()

		if object_data is None:
			result["errors"].append({
				"media_id": record["media_id"],
				"error": "Object data is empty.",
			})
			continue

		processing_result = processing.process_object(io.BytesIO(object_data))

		if processing_result is None:
			result["errors"].append({
				"media_id": record["media_id"],
				"error": "Unsupported file type.",
			})
			continue

		if record["content_type"].startswith("image"):
			processed_file_ext = "webp"
			processed_file_media_type = "image/webp"
		elif record["content_type"].startswith("video"):
			processed_file_ext = "webm"
			processed_file_media_type = "video/webm"

		compressed_object = client.store_object(
			minio=minio,
			database=database,
			bucket_name="looking-glass",
			object_name=f"{record['media_id']}/compressed.{processed_file_ext}",
			data=processing_result["compressed_bytes"],
			content_type=processed_file_media_type,
		)

		preview_object = client.store_object(
			minio=minio,
			database=database,
			bucket_name="looking-glass",
			object_name=f"{record['media_id']}/preview.{processed_file_ext}",
			data=processing_result["preview_bytes"],
			content_type=processed_file_media_type,
		)

		client.update_media(
			database=database,
			media_id=record["media_id"],
			compressed_object_id=compressed_object["object_id"],
			preview_object_id=preview_object["object_id"],
			width=processing_result["dimensions"][0],
			height=processing_result["dimensions"][1],
		)

		result["processed"] += 1

	return jsonify(result), 200


@looking_glass.route("/objects", methods=["GET"])
def list_objects():
	"""
	List all objects associated with Looking Glass media in the database sorted
	in reverse chronological order.
	"""

	database = client.connections.get_database()

	with database.cursor(cursor_factory=client.psycopg2.extras.RealDictCursor) as cursor:
		select_query = """
			SELECT
				co.bucket_name AS compressed_bucket_name,
				co.object_name AS compressed_object_name,
				po.bucket_name AS preview_bucket_name,
				po.object_name AS preview_object_name,
				m.width,
				m.height
			FROM
				media m
				INNER JOIN objects co ON m.compressed_object_id = co.id
				INNER JOIN objects po ON m.preview_object_id = po.id
			WHERE
				co.bucket_name = 'looking-glass'
			ORDER BY
				m.captured_at DESC
		"""

		cursor.execute(select_query)
		objects = cursor.fetchall()

	response = {
		"data": objects,
	}

	return jsonify(response), 200
