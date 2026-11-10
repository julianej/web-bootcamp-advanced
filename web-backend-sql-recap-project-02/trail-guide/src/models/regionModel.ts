import db from '../db/database.js';
import type { Region, RegionInput } from './types.js';

export function getAll(): Region[] {
  return db.prepare<[], Region>('SELECT * FROM regions ORDER BY name').all();
}

export function getById(id: number): Region | undefined {
  return db.prepare<[number], Region>('SELECT * FROM regions WHERE id = ?').get(id);
}

export function create({ name, country }: RegionInput): Region | undefined {
  const result = db
    .prepare('INSERT INTO regions (name, country) VALUES (?, ?)')
    .run(name, country);
  return getById(Number(result.lastInsertRowid));
}

export function update(id: number, { name, country }: RegionInput): Region | undefined {
  db.prepare('UPDATE regions SET name = ?, country = ? WHERE id = ?').run(name, country, id);
  return getById(id);
}

export function remove(id: number): number {
  return db.prepare('DELETE FROM regions WHERE id = ?').run(id).changes;
}