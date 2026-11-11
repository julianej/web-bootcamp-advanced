
import { getDB } from '../db/database.js';
import type { TrailInput, TrailWithRegion } from './types.js';

// ========================================
// REUSABLE SQL QUERY
// ========================================

const SELECT_TRAILS_WITH_REGION = `
  SELECT
    trails.*,
    regions.name AS region_name,
    regions.country AS region_country
  FROM trails
  INNER JOIN regions
    ON trails.region_id = regions.id
`;

// ========================================
// READ: GET ALL TRAILS
// ========================================

export function getAllTrails(): TrailWithRegion[] {
  return getDB()
    .prepare(`
      ${SELECT_TRAILS_WITH_REGION}
      ORDER BY trails.created_at DESC
    `)
    .all() as TrailWithRegion[];
}

// ========================================
// READ: GET TRAIL BY ID
// ========================================

export function getById(id: number): TrailWithRegion | undefined {
  return getDB()
    .prepare(`
      ${SELECT_TRAILS_WITH_REGION}
      WHERE trails.id = ?
    `)
    .get(id) as TrailWithRegion | undefined;
}

// ========================================
// READ: GET TRAIL BY SLUG
// ========================================

export function getTrailBySlug(
  slug: string
): TrailWithRegion | undefined {
  return getDB()
    .prepare(`
      ${SELECT_TRAILS_WITH_REGION}
      WHERE trails.slug = ?
    `)
    .get(slug) as TrailWithRegion | undefined;
}

// ========================================
// READ: GET TRAILS BY REGION
// ========================================

export function getByRegion(regionId: number): TrailWithRegion[] {
  return getDB()
    .prepare(`
      ${SELECT_TRAILS_WITH_REGION}
      WHERE regions.id = ?
      ORDER BY trails.name
    `)
    .all(regionId) as TrailWithRegion[];
}

// ========================================
// CREATE: INSERT NEW TRAIL
// ========================================

export function create(input: TrailInput): TrailWithRegion | undefined {
  const slug = input.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const result = getDB()
    .prepare(`
      INSERT INTO trails (
        region_id,
        name,
        slug,
        description,
        distance_km,
        elevation_m,
        difficulty,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      input.region_id,
      input.name,
      slug,
      input.description,
      input.distance_km,
      input.elevation_m,
      input.difficulty,
      input.image
    );

  return getById(Number(result.lastInsertRowid));
}

// ========================================
// UPDATE: MODIFY EXISTING TRAIL
// ========================================

export function update(
  id: number,
  input: TrailInput
): TrailWithRegion | undefined {
  getDB()
    .prepare(`
      UPDATE trails
      SET region_id = ?,
          name = ?,
          description = ?,
          distance_km = ?,
          elevation_m = ?,
          difficulty = ?,
          image = ?
      WHERE id = ?
    `)
    .run(
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

// ========================================
// DELETE: REMOVE TRAIL
// ========================================

export function remove(id: number): number {
  return getDB()
    .prepare('DELETE FROM trails WHERE id = ?')
    .run(id).changes;
}
