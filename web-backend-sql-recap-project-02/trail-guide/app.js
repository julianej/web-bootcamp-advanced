
// src/app.ts
// Configure Express, Nunjucks and static files

// Load environment variables
import 'dotenv/config';

// Node.js modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Dependencies
import express from 'express';
import nunjucks from 'nunjucks';

const app = express();

// ========================================
// ES MODULES: __dirname replacement
// ========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================
// TEMPLATES // Nunjucks configuration
// ========================================

nunjucks.configure(path.join(__dirname, '../views'), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV !== 'production',
});

app.set('view engine', 'njk');

// ========================================
// MIDDLEWARE
// ========================================

// Parse HTML form bodies
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (API)
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// ========================================
// ROUTES
// ========================================

// Temporary test route
app.get('/', (_req, res) => {
  res.send('ok');
});

// Routers will be mounted here later:
// app.use('/', siteRoutes);
// app.use('/admin', adminRoutes);
// app.use('/api', apiRoutes);

// ========================================
// 404 FALLBACK
// ========================================

app.use((_req, res) => {
  res.status(404).send('Not found');
});

// ========================================
// EXPORT
// ========================================

export default app;
