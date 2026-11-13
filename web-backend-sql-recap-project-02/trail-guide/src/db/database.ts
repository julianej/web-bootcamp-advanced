
import Database from 'better-sqlite3'; 
import path from 'node:path';
import fs from 'node:fs';

// ========================================
// DATABASE CONFIGURATION
// ========================================

const DB_FILE = path.join(process.cwd(), 'src', 'db', 'trailguide.db');
let db: Database.Database | null = null;

// ========================================
// CONNECT DATABASE
// ========================================
// SQLITE3 is a synchronouse library and doenst need <Promise>

export function connectDB(): Database.Database {

  // Ensure database directory exists
  const dbDirectory = path.dirname(DB_FILE);

  if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
  }

  // Connect to database
  db = new Database(DB_FILE);

  // Enable foreign key constraints
  db.pragma('foreign_keys = ON');

  console.log('Database connected:', DB_FILE);

  return db;
}

// ========================================
// GET DATABASE
// ========================================

export function getDB(): Database.Database {
  if (!db) {
    throw new Error('Database is not connected');
  }

  return db;
}

// ========================================
// CLOSE DATABASE
// ========================================

export function closeDB(): void {
  if (db) {
    db.close();
    db = null;
    console.log('Database connection closed');
  }
}