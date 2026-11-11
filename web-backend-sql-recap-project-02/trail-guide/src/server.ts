// server.js only calls listen. 
// It’s optional, but it keeps the app easy to test.
import app from './app.js';

// COMMON.JS SYNTAX
// const app = require('./app');

// src/server.ts

import 'dotenv/config';
import { connectDB, closeDB } from './db/database.js';

const PORT = Number(process.env.PORT) || 3000;

// ========================================
// START SERVER
// ========================================

async function startServer() {
  try {
    // 1. Connect to SQLite before accepting requests
    await connectDB();

    // 2. Start Express
    const server = app.listen(PORT, () => {
      console.log(`Trail Guide running at http://localhost:${PORT}`);
    });

    // ========================================
    // GRACEFUL SHUTDOWN
    // ========================================

    const shutdown = () => {
      console.log('\nShutting down server...');

      server.close(() => {
        closeDB();
        console.log('Database connection closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error('Failed to start application:', error);
    closeDB();
    process.exit(1);
  }
}

startServer();