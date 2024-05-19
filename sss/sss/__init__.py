import io

from flask import Flask, request, jsonify

import client


app = Flask(__name__)
spaceship_storage = client.SpaceshipStorage()


@app.route("/")
def index():
	return "<p>Spaceship Storage</p>"


@app.route("/upload", methods=["POST"])
def upload_file():
	if "file" not in request.files:
		return jsonify({ "error": "No file attached." }), 400

	if request.files["file"].filename == "":
		return jsonify({ "error": "No file attached." }), 400

	bucket_name = request.form.get("bucket_name")
	object_name = request.form.get("object_name")

	if not bucket_name or not object_name:
		return jsonify({ "error": "bucket_name and object_name are required." }), 400

	try:
		uploaded_file = request.files["file"]
		uploaded_file_data = io.BytesIO(uploaded_file.read())

		result = spaceship_storage.store_object(
			bucket_name=bucket_name,
			object_name=object_name,
			data=uploaded_file_data,
			content_type=uploaded_file.content_type,
		)

		response = {
			"message": "Success!",
			"object_id": result["object_id"],
			"inserted": result["inserted"],
		}

	except Exception as e:
		return jsonify({ "error": str(e) }), 500

	return jsonify(response), 200
