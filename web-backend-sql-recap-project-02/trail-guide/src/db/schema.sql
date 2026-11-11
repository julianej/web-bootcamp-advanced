PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS trails;
DROP TABLE IF EXISTS regions;

CREATE TABLE regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL
);

CREATE TABLE trails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  distance_km REAL NOT NULL,
  elevation_m INTEGER NOT NULL DEFAULT 0,
  difficulty TEXT NOT NULL,
  image TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE INDEX idx_trails_region_id ON trails(region_id);