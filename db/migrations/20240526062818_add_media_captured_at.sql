-- migrate:up
ALTER TABLE media
ADD COLUMN captured_at TIMESTAMP;

-- migrate:down
ALTER TABLE media
DROP COLUMN IF EXISTS captured_at;
