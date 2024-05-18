-- migrate:up
CREATE TABLE objects (
	id UUID PRIMARY KEY,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	bucket_name VARCHAR(255) NOT NULL,
	object_name VARCHAR(255) NOT NULL,
	CONSTRAINT unique_object UNIQUE (bucket_name, object_name)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_objects_updated_at
BEFORE UPDATE ON objects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();;

-- migrate:down
DROP TRIGGER IF EXISTS update_objects_updated_at ON objects;
DROP FUNCTION IF EXISTS update_updated_at_column;
DROP TABLE IF EXISTS objects;
