-- migrate:up
ALTER TABLE objects
RENAME COLUMN media_type TO content_type;

-- migrate:down
ALTER TABLE objects
RENAME COLUMN content_type TO media_type;
