
# Trail Guide – Project

<img width="3530" height="1862" alt="Bildschirmfoto 2026-11-12 um 21 19 33" src="https://github.com/user-attachments/assets/06b66cdb-4896-4ec8-a037-11bf884312ca" />

<img width="3528" height="1772" alt="Bildschirmfoto 2026-11-12 um 21 21 16" src="https://github.com/user-attachments/assets/5a5db3c7-abf6-4e72-9eb0-e88ead27a620" />

<img width="3518" height="1842" alt="Bildschirmfoto 2026-11-12 um 21 22 09" src="https://github.com/user-attachments/assets/e751a1be-b404-4c6d-84ca-a6cff3b10840" />

<img width="3446" height="1852" alt="Bildschirmfoto 2026-11-12 um 21 23 07" src="https://github.com/user-attachments/assets/493fd4c6-c0df-4c03-b8b6-030ed075cab5" />


This document describes the planned folder structure for the Trail Guide recap project.

## Folder Structure

```text
trail-guide/
│
├── package.json
├── tsconfig.json           # TypeScript config (rootDir: src, outDir: dist)
├── .env                    # API_KEY, PORT (not committed to Git)
├── .gitignore              # node_modules/, .env, *.db, dist/
│
├── src/
│   ├── app.ts              # Express app: middleware, Nunjucks, routers
│   ├── server.ts           # Optional: app.listen(), separated from app.ts
│   │
│   ├── db/
│   │   ├── database.ts     # SQLite connection (e.g. better-sqlite3)
│   │   ├── schema.sql      # CREATE TABLE regions / trails
│   │   ├── seed.sql        # Sample data
│   │   └── init.ts         # Execute schema + seed (npm run db:init)
│   │
│   ├── models/
│   │   ├── types.ts        # Shared types: Region, Trail, TrailInput, ...
│   │   ├── regionModel.ts  # getAll, getById, create, update, remove
│   │   └── trailModel.ts   # getAllWithRegion (INNER JOIN), getById, create, ...
│   │
│   ├── controllers/
│   │   ├── siteController.ts   # Public website pages (HTML)
│   │   ├── adminController.ts  # Admin forms (HTML)
│   │   └── apiController.ts    # JSON responses
│   │
│   ├── routes/
│   │   ├── siteRoutes.ts   # /, /trails, /trails/:id, /regions/:id
│   │   ├── adminRoutes.ts  # /admin/...
│   │   └── apiRoutes.ts    # /api/...
│   │
│   └── middleware/
│       ├── requireApiKey.ts    # Checks request header (e.g. x-api-key) for POST/PUT/DELETE
│       ├── sanitizeBody.ts     # Sanitizes HTML from form submissions
│       └── errorHandler.ts     # 404 and error handling
│
├── views/                  # Not compiled, stays outside src/
│   ├── layouts/
│   │   └── base.njk        # <head> with pico.css CDN, header, nav, footer
│   │
│   ├── site/
│   │   ├── home.njk
│   │   ├── trails.njk      # Trail listing
│   │   ├── trail.njk       # Trail details, including region and country
│   │   └── region.njk
│   │
│   ├── admin/
│   │   ├── dashboard.njk
│   │   ├── trail-form.njk  # Shared form for creating and editing trails
│   │   └── region-form.njk
│   │
│   └── errors/
│       └── 404.njk
│
├── public/                 # Static files (only if needed)
│
└── dist/                   # Compiled JavaScript (npm run build, not committed to Git)
``

## Main Features

1. **Public Website:** Browse trails, view individual trail details and explore regions.
2. **Admin Area:** Create, read, update and delete trails and regions through HTML forms.
3. **Public API:** Provide JSON endpoints for external applications.
4. **Database:** Use SQLite with a one-to-many relationship between regions and trails.
5. **Security:** Protect API write endpoints with an API key and sanitize user-submitted HTML.
6. **Styling:** Use pico.css via CDN and semantic HTML without custom utility classes.
`

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Runs `src/server.ts` with `tsx` and restarts on changes |
| `npm run db:init` | Runs `src/db/init.ts` (schema + seed) |
| `npm run typecheck` | Type-checks without emitting files |
| `npm run build` | Compiles `src/` to `dist/` |
| `npm start` | Runs the compiled `dist/server.js` |

## Architecture

The application follows the MVC (Model-View-Controller) pattern.

| Layer | Responsibility |
|---|---|
| Models | Database queries, CRUD operations and shared types |
| Views | Nunjucks templates and HTML |
| Controllers | Application logic and HTTP responses |
| Routes | URL definitions and controller mapping |
| Middleware | Request processing, authentication and error handling |
| Database | SQLite connection, schema and seed data |

## Application Flow

```text
HTTP Request
     │
     ▼
   Routes
     │
     ▼
  Middleware
     │
     ▼
 Controllers
     │
     ▼
   Models
     │
     ▼
   SQLite
     │
     ▼
 Controllers
     │
     ├── HTML response (Nunjucks)
     │
     └── JSON response (API)
```


## Database Relationship

- One region can contain multiple trails.
- Each trail belongs to one region.
- `trails.region_id` references `regions.id`.
- Use SQL `INNER JOIN` to retrieve trail information together with its region and country.

## Development Notes

- Keep application configuration in `app.js`.
- Keep server startup in `server.js`.
- Keep SQL queries inside the model layer.
- Reuse model functions across website, admin and API controllers.
- Keep API authentication in middleware.
- Store environment variables in `.env` and never commit this file to Git.


## SETUP & TEST DATABASE
```bash
npm run db:init
node check.js
```

<img width="2720" height="1664" alt="select_with_region_join_sketch_bw" src="https://github.com/user-attachments/assets/f85de965-4cee-4054-ad39-6dadb8a0337b" />

## SETUP TYPESCRIPT
```bash
npm install -D typescript tsx @types/node @types/express @types/nunjucks @types/better-sqlite3 @types/sanitize-html
npm install -D typescript
npm install -D @types/node
npm install -D @types/nunjucks
npm install -D @types/better-sqlite3
npm install -D @types/express
npm install -D @types/sanitize-html
npx tsc --init

** RENAME FILES **
mv app.js app.ts
mv server.js server.ts
mv db/database.js db/database.ts
mv db/init.js db/init.ts
```

## UPDATE PACKAGE.JSON whenever you change FOLDER SETUP**
- npm install --include=dev
- verify with: npm ls @types/node express dotenv better-sqlite3 

```bash

```json
"main": "dist/server.js",
"scripts": {
  "start": "node dist/server.js",
  "dev": "tsx watch src/server.ts",
  "db:init": "tsx src/db/init.ts",
  "typecheck": "tsc --noEmit",
  "build": "tsc"
},
```

## TEST LOG FILE
```bash
rm -rf node_modules
npm ci --include=dev
npm run build
```

## SEARCH DIRECTORY
```bash
grep -R -n "getAllWithRegion" src
```
