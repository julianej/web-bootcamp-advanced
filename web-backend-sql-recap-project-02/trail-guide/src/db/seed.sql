INSERT INTO regions (name, country) VALUES
  ('Bavarian Alps', 'Germany'),
  ('Scottish Highlands', 'United Kingdom');

INSERT INTO trails (region_id, name, description, distance_km, elevation_m, difficulty) VALUES
  (1, 'Partnachklamm Loop', '<p>Schlucht und Waldwege bei Garmisch.</p>', 8.5, 350, 'easy'),
  (1, 'Zugspitze via Reintal', '<p>Lange Tour mit Hüttenübernachtung.</p>', 21.0, 2200, 'hard'),
  (2, 'Ben Nevis Mountain Track', '<p>Der höchste Berg Großbritanniens.</p>', 17.0, 1350, 'moderate');