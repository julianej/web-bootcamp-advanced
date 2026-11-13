
// src/app.ts
// Configure Express, Nunjucks and static files

// Load environment variables first
import 'dotenv/config';

// Node.js modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Dependencies
import express from 'express';
import nunjucks from 'nunjucks';

// Middleware
import { sanitizeBody } from './middleware/sanitizeBody.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

// Routers
import siteRoutes from './routes/siteRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import apiRoutes from './routes/apiRoutes.js';


const app = express();

// ========================================
// ES MODULES: __dirname replacement
// ========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================
// TEMPLATES: Nunjucks configuration
// ========================================

nunjucks.configure(path.join(__dirname, '../views'), {
  autoescape: true,
  express: app,
  watch: true,
});

app.set('view engine', 'njk');

// ========================================
// MIDDLEWARE
// ========================================

// Parse HTML form bodies
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(express.json());

// Custom middleware
app.use(sanitizeBody);
app.use(logger);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.use(
  '/css',
  express.static(
    path.join(__dirname, '..', 'node_modules', '@picocss', 'pico', 'css')
  )
);

// ========================================
// ROUTES
// ========================================

app.use('/', siteRoutes);

// Mounted later:
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// ========================================
// 404 FALLBACK - NOT FOUND - unknown URL
// ========================================

// ========================================
// 500 GLOBAL ERROR HANDLER - SOMETHING WENT WRONG
// ========================================
app.use(notFoundHandler);
app.use(errorHandler);

// ========================================
// EXPORT
// ========================================

export default app;
