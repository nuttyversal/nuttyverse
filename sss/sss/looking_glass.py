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
		compressed_file_ext = "webp"
	elif processing_result["content_type"] == "video":
		compressed_file_ext = "webm"

	compressed_object = client.store_object(
		minio=minio,
		database=database,
		bucket_name="looking-glass",
		object_name=f"{media_id}/compressed.{compressed_file_ext}",
		data=processing_result["compressed_bytes"],
		content_type=file.content_type,
	)

	# Record the metadata in the database.
	client.upload_media(
		database=database,
		media_id=media_id,
		original_object_id=original_object["object_id"],
		compressed_object_id=compressed_object["object_id"],
		width=processing_result["dimensions"][0],
		height=processing_result["dimensions"][1],
	)

	response = {
		"message": "Success!",
		"media_id": media_id,
	}

	return jsonify(response), 200

@looking_glass.route("/objects", methods=["GET"])
def list_objects():
	"""
	List all objects associated with Looking Glass media in the database.
	"""

	database = client.connections.get_database()

	with database.cursor(cursor_factory=client.psycopg2.extras.RealDictCursor) as cursor:
		select_query = """
			SELECT bucket_name, object_name, width, height
			FROM media
			INNER JOIN objects ON media.compressed_object_id = objects.id
			WHERE bucket_name = 'looking-glass'
		"""

		cursor.execute(select_query)
		objects = cursor.fetchall()

	response = {
		"data": objects,
	}

	return jsonify(response), 200
