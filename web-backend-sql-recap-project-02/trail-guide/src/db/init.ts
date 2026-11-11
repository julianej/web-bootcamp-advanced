import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

import { getDB } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function initDB(): void {
  const db = getDB();

  // SCHEMA
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf-8');

  db.exec(schema);

  // SEED DATA
  const seedPath = path.join(__dirname, 'seed.sql');
  const seed = readFileSync(seedPath, 'utf-8');

  db.exec(seed);

  console.log('SQLite schema initialized.');
  console.log('SQLite seed data inserted.');
}