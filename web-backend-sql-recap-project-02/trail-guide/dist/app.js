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
// Routers
import siteRoutes from './routes/siteRoutes.js';
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
app.use('/css', express.static(path.join(__dirname, '..', 'node_modules', '@picocss', 'pico', 'css')));
// ========================================
// ROUTES
// ========================================
app.use('/', siteRoutes);
// Mounted later:
// app.use('/admin', adminRoutes);
// app.use('/api', apiRoutes);
// ========================================
// 404 FALLBACK
// ========================================
app.use((_req, res) => {
    res.status(404).render('errors/404');
});
// ========================================
// EXPORT
// ========================================
export default app;
//# sourceMappingURL=app.js.map