PRAGMA foreign_keys = ON;
-- // FOREIGN KEY (region_id) REFERENCES regions(id)
-- // This establishes a relationship between trails.region_id and regions.id.

DROP TABLE IF EXISTS trails;
DROP TABLE IF EXISTS regions;

CREATE TABLE IF NOT EXISTS regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS trails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  distance_km REAL NOT NULL,
  elevation_m INTEGER NOT NULL,
  difficulty TEXT NOT NULL,
  image TEXT,
  created_at INTEGER NOT NULL,

  FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE INDEX idx_trails_region_id ON trails(region_id);