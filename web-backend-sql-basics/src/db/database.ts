// TASK-01
//npm install better-sqlite3
//npm install -D @types/better-sqlite3

import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

// Store the database connection
let db: InstanceType<typeof Database> | null = null;

// CONNECT to SQLite
export function connectDB() {
  if (db) {
    return db;
  }

  // Define the path to the SQLite database file
  const dbPath = path.resolve(
    process.cwd(),
    "data",
    "blog.sqlite"
  );

  // Create the data directory if it doesn't exist
  fs.mkdirSync(path.dirname(dbPath), {
    recursive: true,
  });

  db = new Database(dbPath);

  // Enable foreign key constraints
  db.pragma("foreign_keys = ON");

  console.log("Connected to SQLite database:", dbPath);

  return db;
}

// GET the existing database connection
export function getDB() {
  if (!db) {
    throw new Error(
      "Database not connected. Call connectDB() first."
    );
  }

  return db;
}


// TASK-03
// Register SIGINT and SIGTERM handlers that call closeDB() before exiting
process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing database connection...");
  closeDB();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Closing database connection...");
  closeDB();
  process.exit(0);
});


// CLOSE the database connection
export function closeDB() {
  if (db) {
    db.close();
    db = null;

    console.log("Database connection closed.");
  }
}