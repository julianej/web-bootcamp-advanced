# Trail Guide – Project Structure

This document describes the planned folder structure for the Trail Guide recap project.

## Folder Structure

```text
trail-guide/
│
├── package.json
├── .env                    # API_KEY, PORT (not committed to Git)
├── .gitignore
├── app.js                  # Express app: middleware, Nunjucks, routers
├── server.js               # Optional: app.listen(), separated from app.js
│
├── db/
│   ├── database.js         # SQLite connection (e.g. better-sqlite3)
│   ├── schema.sql          # CREATE TABLE regions / trails
│   ├── seed.sql            # Sample data
│   └── init.js             # Execute schema + seed (npm run db:init)
│
├── models/
│   ├── regionModel.js      # getAll, getById, create, update, delete
│   └── trailModel.js       # getAllWithRegion (INNER JOIN), getById, create, ...
│
├── controllers/
│   ├── siteController.js   # Public website pages (HTML)
│   ├── adminController.js  # Admin forms (HTML)
│   └── apiController.js    # JSON responses
│
├── routes/
│   ├── siteRoutes.js       # /, /trails, /trails/:id, /regions/:id
│   ├── adminRoutes.js      # /admin/...
│   └── apiRoutes.js        # /api/...
│
├── middleware/
│   ├── requireApiKey.js    # Checks request header (e.g. x-api-key) for POST/PUT/DELETE
│   ├── sanitizeBody.js     # Sanitizes HTML from form submissions
│   └── errorHandler.js     # 404 and error handling
│
├── views/
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
└── public/                 # Static files (only if needed)
```

## Architecture

The application follows the MVC (Model-View-Controller) pattern.

| Layer | Responsibility |
|---|---|
| Models | Database queries and CRUD operations |
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

## Main Features

1. **Public Website:** Browse trails, view individual trail details and explore regions.
2. **Admin Area:** Create, read, update and delete trails and regions through HTML forms.
3. **Public API:** Provide JSON endpoints for external applications.
4. **Database:** Use SQLite with a one-to-many relationship between regions and trails.
5. **Security:** Protect API write endpoints with an API key and sanitize user-submitted HTML.
6. **Styling:** Use pico.css via CDN and semantic HTML without custom utility classes.

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

## INSTALL
# Project Setup

```bash
mkdir trail-guide && cd trail-guide
npm init -y
npm install

mkdir -p db models controllers routes middleware public
mkdir -p views/layouts views/site views/admin views/errors

touch app.js server.js .env .gitignore

touch db/database.js db/schema.sql db/seed.sql db/init.js

touch models/regionModel.js models/trailModel.js

touch controllers/siteController.js controllers/adminController.js controllers/apiController.js

touch routes/siteRoutes.js routes/adminRoutes.js routes/apiRoutes.js

touch middleware/requireApiKey.js middleware/sanitizeBody.js middleware/errorHandler.js

touch views/layouts/base.njk

npm install chokidar
```

## SETUP & TEST DATABASE
```bash
npm run db:init
node check.js
```
## SETUP TYPESCRIPT
```bash
npm install -D typescript tsx @types/node @types/express @types/nunjucks @types/better-sqlite3 @types/sanitize-html

** RENAME FILES **
mv app.js app.ts
mv server.js server.ts
mv db/database.js db/database.ts
mv db/init.js db/init.ts
```