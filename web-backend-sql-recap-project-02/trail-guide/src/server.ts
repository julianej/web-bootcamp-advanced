
import 'dotenv/config';

import app from './app.js';
import { connectDB, closeDB } from './db/database.js';
import { initDB } from './db/init.js';

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await connectDB();

    initDB();

    const server = app.listen(PORT, () => {
      console.log(`Trail Guide running at http://localhost:${PORT}`);
    });

    const shutdown = (): void => {
      console.log('\nShutting down server...');

      server.close(async () => {
        await closeDB();
        console.log('Database connection closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error('Failed to start application:', error);
    await closeDB();
    process.exit(1);
  }
}

startServer();
