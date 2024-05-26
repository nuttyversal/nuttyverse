-- migrate:up
ALTER TABLE media
ADD COLUMN description TEXT NOT NULL;

-- migrate:down
ALTER TABLE media
DROP COLUMN IF EXISTS description;
