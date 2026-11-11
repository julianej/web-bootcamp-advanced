
-- ========================================
-- SEED REGIONS
-- ========================================


INSERT INTO regions (name, country) VALUES
  ('Bavarian Alps', 'Germany'),
  ('Scottish Highlands', 'United Kingdom');


-- ========================================
-- SEED TRAILS
-- ========================================

INSERT INTO trails (
  region_id,
  name,
  slug,
  description,
  distance_km,
  elevation_m,
  difficulty,
  image,
  created_at
) VALUES
  (
    (SELECT id FROM regions WHERE name = 'Bavarian Alps'),
    'Partnachklamm Loop',
    'partnachklamm-loop',
    'Schlucht und Waldwege bei Garmisch. The Partnachklamm Loop is a scenic hiking route near Garmisch-Partenkirchen. Follow the impressive gorge through dramatic rock formations and continue into the surrounding alpine landscape.',
    8.5,
    350,
    'easy',
    '/img/trail-01.png',
    unixepoch()
  ),
  (
    (SELECT id FROM regions WHERE name = 'Bavarian Alps'),
    'Zugspitze via Reintal',
    'zugspitze-via-reintal',
    'Lange Tour mit Hüttenübernachtung.The Zugspitze offers spectacular alpine scenery, rugged mountain terrain and breathtaking panoramic views across the Bavarian Alps and beyond. This challenging high-altitude destination features dramatic rocky landscapes, steep ascents and unforgettable views of more than 400 mountain peaks on clear days. A rewarding experience for experienced hikers and mountain enthusiasts.',
    21.0,
    2200,
    'hard',
    '/img/trail-02.png',
    unixepoch()
  ),
  (
    (SELECT id FROM regions WHERE name = 'Scottish Highlands'),
    'Ben Nevis Mountain Track',
    'ben-nevis-mountain-track',
    'Der höchste Berg Großbritanniens. The Partnachklamm Loop is a scenic hiking route near Garmisch-Partenkirchen. Follow the impressive gorge through dramatic rock formations and continue into the surrounding alpine landscape.',
    17.0,
    1350,
    'moderate',
    '/img/trail-03.png',
    unixepoch()
  );
