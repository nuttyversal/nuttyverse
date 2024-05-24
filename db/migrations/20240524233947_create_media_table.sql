-- migrate:up
CREATE TABLE media (
	id UUID PRIMARY KEY,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	original_object_id UUID NOT NULL,
	compressed_object_id UUID NOT NULL,
	CONSTRAINT fk_original_object FOREIGN KEY (original_object_id) REFERENCES objects(id),
	CONSTRAINT fk_compressed_object FOREIGN KEY (compressed_object_id) REFERENCES objects(id)
);

CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON media
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- migrate:down
DROP TRIGGER IF EXISTS update_media_updated_at ON media;
DROP TABLE IF EXISTS media;
