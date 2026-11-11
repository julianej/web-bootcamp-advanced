// server.js only calls listen. 
// It’s optional, but it keeps the app easy to test.

import 'dotenv/config';

import app from './app.js';
import { connectDB, closeDB } from './db/database.js';
import { initDB } from './db/init.js';

const PORT = Number(process.env.PORT) || 3000;

// ========================================
// START SERVER
// ========================================

async function startServer() {
  try {
    // 1. Connect to SQLite
    await connectDB();

    // 2. Initialize schema, migrations and seed data
    initDB();

    // 3. Start Express
    const server = app.listen(PORT, () => {
      console.log(`Trail Guide running at http://localhost:${PORT}`);
    });

    // ========================================
    // GRACEFUL SHUTDOWN
    // ========================================

    let isShuttingDown = false;

    const shutdown = () => {
      if (isShuttingDown) return;
      isShuttingDown = true;

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
