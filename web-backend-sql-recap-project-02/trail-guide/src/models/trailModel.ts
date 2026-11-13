
import { getDB } from '../db/database.js';
import type { TrailInput, TrailWithRegion } from './types.js';
import { createSlug } from '../utils/createSlug.js';


// ========================================
// REUSABLE SQL QUERY
// ========================================

const SELECT_TRAILS_WITH_REGION = `
  SELECT
    trails.*,
    regions.name AS region_name,
    regions.slug AS region_slug,
    regions.country AS region_country
  FROM trails
  INNER JOIN regions
    ON trails.region_id = regions.id
`;

// ========================================
// READ: GET ALL TRAILS
// ========================================

// export function getAllTrails(): TrailWithRegion[] {
//   return getDB()
//     .prepare(`
//       ${SELECT_TRAILS_WITH_REGION}
//       ORDER BY trails.created_at DESC
//     `)
//     .all() as TrailWithRegion[];
// }

export function getAllTrails(): TrailWithRegion[] {
  return getDB()
    .prepare(`
      ${SELECT_TRAILS_WITH_REGION}
      ORDER BY trails.name ASC
    `)
    .all() as TrailWithRegion[];
}

export function searchTrails(filters: {
  q?: string;
  region?: string;
  difficulty?: string;
}): TrailWithRegion[] {
  const db = getDB();

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  // Search by trail name
  if (filters.q?.trim()) {
    conditions.push('trails.name LIKE ?');
    params.push(`%${filters.q.trim()}%`);
  }

  // Filter by region slug
  if (filters.region?.trim()) {
    conditions.push('regions.slug = ?');
    params.push(filters.region);
  }

  // Filter by difficulty
  if (filters.difficulty?.trim()) {
    conditions.push('trails.difficulty = ?');
    params.push(filters.difficulty);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  const sql = `
    ${SELECT_TRAILS_WITH_REGION}
    ${whereClause}
    ORDER BY trails.name ASC
  `;

  return db.prepare(sql).all(...params) as TrailWithRegion[];
}

// ========================================
// READ: GET TRAIL BY SLUG
// ========================================

export function getTrailBySlug(slug: string ): TrailWithRegion | undefined {
  return getDB()
    .prepare(`
      ${SELECT_TRAILS_WITH_REGION}
      WHERE trails.slug = ?
    `)
    .get(slug) as TrailWithRegion | undefined;
}

// ========================================
// READ: GET TRAIL BY ID
// ========================================

export function getTrailById(id: number): TrailWithRegion | undefined {
  return getDB()
    .prepare(`
      ${SELECT_TRAILS_WITH_REGION}
      WHERE trails.id = ?
    `)
    .get(id) as TrailWithRegion | undefined;
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

export function create(
  input: TrailInput
):TrailWithRegion | undefined {
  const slug = createSlug(input.name);

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

  return getTrailById(Number(result.lastInsertRowid));
}

// ========================================
// UPDATE: MODIFY EXISTING TRAIL
// ========================================

export function update(
  id: number,
  input: TrailInput
): TrailWithRegion | undefined {
  const slug = createSlug(input.name);

  getDB()
    .prepare(`
      UPDATE trails
      SET region_id = ?,
          name = ?,
          slug = ?,
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
      slug,
      input.description,
      input.distance_km,
      input.elevation_m,
      input.difficulty,
      input.image,
      id
    );

  return getTrailById(id);
}

// ========================================
// DELETE: REMOVE TRAIL
// ========================================

export function deleteTrail(slug: string): void {
  const db = getDB();

  db.prepare(`
    DELETE FROM trails
    WHERE slug = ?
  `).run(slug);
}


