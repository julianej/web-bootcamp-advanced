import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db: Database.Database = new Database(path.join(__dirname, 'trailguide.db'));
console.log('SQLite database:', db.name);
console.log(
  db.prepare('PRAGMA table_info(trails)').all()
);

// SQLite enforces foreign keys per connection, so set it here every time
db.pragma('foreign_keys = ON');

export default db;