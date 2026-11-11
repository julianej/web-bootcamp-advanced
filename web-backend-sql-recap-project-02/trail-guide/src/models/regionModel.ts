
import { getDB } from '../db/database.js';
import type { Region, RegionInput } from './types.js';

// ========================================
// READ: GET ALL REGIONS
// ========================================

export function getAll(): Region[] {
  return getDB()
    .prepare<[], Region>('SELECT * FROM regions ORDER BY name')
    .all();
}

// ========================================
// READ: GET REGION BY ID
// ========================================

export function getById(id: number): Region | undefined {
  return getDB()
    .prepare<[number], Region>('SELECT * FROM regions WHERE id = ?')
    .get(id);
}

// ========================================
// CREATE: INSERT NEW REGION
// ========================================

export function create({ name, country }: RegionInput): Region | undefined {
  const result = getDB()
    .prepare('INSERT INTO regions (name, country) VALUES (?, ?)')
    .run(name, country);

  return getById(Number(result.lastInsertRowid));
}

// ========================================
// UPDATE: MODIFY EXISTING REGION
// ========================================

export function update(
  id: number,
  { name, country }: RegionInput
): Region | undefined {
  getDB()
    .prepare('UPDATE regions SET name = ?, country = ? WHERE id = ?')
    .run(name, country, id);

  return getById(id);
}

// ========================================
// DELETE: REMOVE REGION
// ========================================

export function remove(id: number): number {
  return getDB()
    .prepare('DELETE FROM regions WHERE id = ?')
    .run(id).changes;
}
