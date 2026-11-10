import db from '../db/database.js';
import type { Trail, TrailInput } from './types.js';

const SELECT_WITH_REGION = `
  SELECT
    t.id,
    t.name,
    t.description,
    t.distance_km,
    t.elevation_m,
    t.difficulty,
    t.image,
    t.created_at,
    r.id AS region_id,
    r.name AS region_name,
    r.country AS country
  FROM trails t
  INNER JOIN regions r ON r.id = t.region_id
`;

export function getAllWithRegion(): Trail[] {
  return db
    .prepare<[], Trail>(`${SELECT_WITH_REGION} ORDER BY r.name, t.name`)
    .all();
}

export function getById(id: number): Trail | undefined {
  return db.prepare<[number], Trail>(`${SELECT_WITH_REGION} WHERE t.id = ?`).get(id);
}

export function getByRegion(regionId: number): Trail[] {
  return db
    .prepare<[number], Trail>(`${SELECT_WITH_REGION} WHERE r.id = ? ORDER BY t.name`)
    .all(regionId);
}

export function create(input: TrailInput): Trail | undefined {
  const result = db
    .prepare(
      `INSERT INTO trails (
        region_id,
        name,
        description,
        distance_km,
        elevation_m,
        difficulty,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.region_id,
      input.name,
      input.description,
      input.distance_km,
      input.elevation_m,
      input.difficulty,
      input.image
    );

  return getById(Number(result.lastInsertRowid));
}

export function update(id: number, input: TrailInput): Trail | undefined {
  db.prepare(
    `UPDATE trails
     SET region_id = ?,
         name = ?,
         description = ?,
         distance_km = ?,
         elevation_m = ?,
         difficulty = ?,
         image = ?
     WHERE id = ?`
  ).run(
    input.region_id,
    input.name,
    input.description,
    input.distance_km,
    input.elevation_m,
    input.difficulty,
    input.image,
    id
  );

  return getById(id);
}

export function remove(id: number): number {
  return db.prepare('DELETE FROM trails WHERE id = ?').run(id).changes;
}