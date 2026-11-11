-- Add image column to existing trails table
ALTER TABLE trails ADD COLUMN image TEXT;

-- Update existing trails with image paths
UPDATE trails
SET image = '/img/trail-01.png'
WHERE name = 'Partnachklamm Loop';

UPDATE trails
SET image = '/img/trail-02.png'
WHERE name = 'Zugspitze via Reintal';

UPDATE trails
SET image = '/img/trail-03.png'
WHERE name = 'Ben Nevis Mountain Track';