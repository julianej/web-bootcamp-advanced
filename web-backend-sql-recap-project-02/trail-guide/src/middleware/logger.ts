// Whenever somebody visits your website, the logger records:
// - Timestamp: When the request happened.
// - Method: What kind of request (GET, POST, etc.).
// - URL: Which page or endpoint was requested.
// - Status code: Whether the request succeeded (200), failed (404), etc.
// - also called LOGGER
// - DISPLAY LOGS cat logs/access.log



import type { Request, Response, NextFunction } from 'express';
import fs from 'node:fs';
import path from 'node:path';

// Path to the access log
const logDirectory = path.join(process.cwd(), 'logs');
const logFile = path.join(logDirectory, 'access.log');

// Ensure the logs directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Logger middleware
export function logger(
  req: Request,
  res: Response,
  next: NextFunction
): void {

  // Wait until the response has finished
  res.on('finish', () => {
    // Timestamp
    const timestamp = new Date().toISOString();

    // logEntry
    const logEntry = `${timestamp} ${req.method} ${req.originalUrl} ${res.statusCode}\n`;

    // Append the log entry to the file
    fs.appendFile(logFile, logEntry, (error) => {
      if (error) {
        console.error('Error writing access log:', error);
      }
    });
  });

  next();
}