-- migrate:up
ALTER TABLE objects
ADD COLUMN media_type VARCHAR(255) NOT NULL,
ADD COLUMN size BIGINT NOT NULL;

-- migrate:down
ALTER TABLE objects
DROP COLUMN IF EXISTS media_type,
DROP COLUMN IF EXISTS size;
