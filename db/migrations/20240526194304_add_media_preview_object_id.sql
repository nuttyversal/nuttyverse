-- migrate:up
ALTER TABLE media
ADD COLUMN preview_object_id UUID NOT NULL;

ALTER TABLE media
ADD CONSTRAINT fk_preview_object FOREIGN KEY (preview_object_id) REFERENCES objects(id);

-- migrate:down
ALTER TABLE media
DROP CONSTRAINT IF EXISTS fk_preview_object;

ALTER TABLE media
DROP COLUMN IF EXISTS preview_object_id;
