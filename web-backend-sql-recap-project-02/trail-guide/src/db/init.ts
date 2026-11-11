
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db from './database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const schema = fs.readFileSync(
  path.join(__dirname, 'schema.sql'),
  'utf8'
);

const seed = fs.readFileSync(
  path.join(__dirname, 'seed.sql'),
  'utf8'
);

const migration = fs.readFileSync(
  path.join(__dirname, 'migrate.sql'),
  'utf8'
);

db.exec(schema);
db.exec(migration);
db.exec(seed);

console.log('Database initialised.');
