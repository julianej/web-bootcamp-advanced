import { getDB } from '../db/database.js';
import type { Region } from './types.js';

// GET ALL REGIONS
export function getAllRegions(): Region[] {
  return getDB()
    .prepare(`
      SELECT *
      FROM regions
      ORDER BY name ASC
    `)
    .all() as Region[];
}

// GET REGION BY SLUG
export function getRegionBySlug(
  slug: string
): Region | undefined {
  return getDB()
    .prepare(`
      SELECT *
      FROM regions
      WHERE slug = ?
    `)
    .get(slug) as Region | undefined;
}

// GET REGION BY ID
export function getRegionById(id: number): Region | undefined {
  const db = getDB();

  return db.prepare(`
    SELECT *
    FROM regions
    WHERE id = ?
  `).get(id) as Region | undefined;
}