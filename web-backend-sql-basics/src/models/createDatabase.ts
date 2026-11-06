//models/createDatabase.ts
import Database from "better-sqlite3";

let db: Database.Database | null = null;

export function connectDB(): Database.Database {
  if (!db) {
    db = new Database("blog.db");
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      title TEXT NOT NULL,
      image TEXT NOT NULL,
      author TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      teaser TEXT NOT NULL,
      content TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE
    )
  `);

  console.log("Database connected. Posts table is ready.");

  return db;
}

export function closeDB(): void {
  if (db) {
    db.close();
    db = null;
    console.log("Database connection closed.");
  }
}