import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// CONNECT PATH
// const db: Database.Database = new Database(path.join(__dirname, 'trailguide.db'));
let db = null;
// WHERE 
// console.log('SQLite database:', db.name);
// COLUMNS
// console.log(
//   db.prepare('PRAGMA table_info(trails)').all()
// );
// Connect to SQLite
export async function connectDB() {
    if (db)
        return;
    const dbPath = path.join(__dirname, 'trailguide.db');
    db = new Database(dbPath);
    // Enable foreign key constraints
    db.pragma('foreign_keys = ON');
    console.log('SQLite connected:', dbPath);
}
// Get the database connection
export function getDB() {
    if (!db) {
        throw new Error('Database is not connected.');
    }
    return db;
}
// Close SQLite connection
export function closeDB() {
    if (db) {
        db.close();
        db = null;
        console.log('SQLite connection closed.');
    }
}
//# sourceMappingURL=database.js.map