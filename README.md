# Web Bootcamp Advanced

A collection of advanced web development exercises and projects focused on **TypeScript, Node.js, Express, MVC architecture, and SQL databases**.

The goal is to build a solid understanding of backend development, application structure, data management, and server-side programming.

## Tech Stack

- **TypeScript** – Static typing and maintainable JavaScript
- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **Nunjucks** – Server-side HTML templating
- **SQLite** – Relational database
- **better-sqlite3** – SQLite integration for Node.js
- **Nodemon** – Automatic server restarts during development
- **tsx** – Running TypeScript files directly
- **Git & GitHub** – Version control

## Requirements

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)
- [SQLite](https://sqlite.org/)

Check your installations:
- ** Node.js (Primary Setup) ** -
  
```bash
node -v
npm -v
npm install
npm run dev
```

- ** Bun (Alternative) ** -
```bash
bun -v
bun install
bun run dev
```

Bun can also execute TypeScript files directly:
bun run src/app.ts

Note: The project scripts, dependencies, and TypeScript configuration are primarily tested with Node.js. Bun is optional and may behave differently depending on the package or runtime APIs used.


## Getting Started

Clone the repository:

```bash
git clone <repository-url>
cd web-bootcamp-advanced
```

Navigate into the individual project directory:

```bash
cd web-backend-mvc-pattern-blog
```

Install dependencies:

```bash
npm install
```

## TypeScript Setup

The projects use TypeScript with Node.js and ES modules.

Typical TypeScript configuration (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true
  },
  "include": ["src/**/*.ts"]
}
```

Use `.js` extensions in relative imports when working with NodeNext module resolution:

```typescript
import { loadPosts } from "./models/postModels.js";
```

Even though the source files use `.ts`, TypeScript resolves the corresponding modules and compiles them to JavaScript.

## Development Commands

Start the development server:

```bash
npm run dev
```

Compile TypeScript:

```bash
npm run build
```

Run the compiled application (if configured):

```bash
npm start
```

## Project Architecture

The backend follows the **MVC (Model-View-Controller)** pattern.

```text
src/
├── app.ts
├── controllers/
│   ├── adminController.ts
│   └── postController.ts
├── data/
│   └── post.ts
├── db/
│   └── database.ts
├── models/
│   └── postModels.ts
├── routes/
│   ├── admin.ts
│   └── index.ts
└── utils/
    └── helper.ts

views/
├── layouts/
├── components/
├── index.njk
├── post.njk
└── admin.njk

data/
└── blog.sqlite
```

### MVC Responsibilities

| Layer | Responsibility |
|---|---|
| Model | Database queries and CRUD operations |
| View | Rendering HTML with Nunjucks |
| Controller | Handling requests and application logic |
| Routes | Defining application endpoints |
| Database | Managing SQLite connections |

## SQLite Database Setup

The project uses SQLite as a lightweight relational database.

Install the dependencies:

```bash
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

Create the database directory:

```bash
mkdir -p data
```

The database file is:

```text
data/blog.sqlite
```

### Database Connection

The database connection is managed centrally in:

```text
src/db/database.ts
```

The database module provides three main functions:

- `connectDB()` – Opens the SQLite database connection and initializes the database schema.
- `getDB()` – Returns the active database connection.
- `closeDB()` – Closes the database connection.

### Database Schema

The `posts` table stores blog posts.

```sql
CREATE TABLE IF NOT EXISTS posts (
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    author TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    teaser TEXT NOT NULL,
    content TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
);
```

The `slug` is used as the unique identifier for retrieving, updating, and deleting individual posts.

### CRUD Operations

All database operations are handled in the model layer.

| Operation | SQL |
|---|---|
| Create | `INSERT INTO` |
| Read all | `SELECT * FROM` |
| Read one | `SELECT * FROM posts WHERE slug = ?` |
| Update | `UPDATE` |
| Delete | `DELETE FROM` |

Prepared statements are used to safely pass values into SQL queries.

Example:

```typescript
const post = db
  .prepare("SELECT * FROM posts WHERE slug = ?")
  .get(slug);
```

### Database Shutdown

The application registers process signal handlers to close the database connection gracefully.

```typescript
process.on("SIGINT", () => {
  closeDB();
  process.exit(0);
});

process.on("SIGTERM", () => {
  closeDB();
  process.exit(0);
});
```

## SQLite CLI

You can inspect the database directly through the SQLite command-line interface.

Open the database:

```bash
sqlite3 data/blog.sqlite
```

Useful commands:

```sql
.tables
.schema posts
SELECT * FROM posts;
```

Exit SQLite:

```sql
.quit
```

## Git Workflow

Create a feature branch:

```bash
git switch -c feature/branch-name
```

Check the current branch:

```bash
git branch
```

Stage and commit changes:

```bash
git add .
git commit -m "Add SQLite database integration"
```

Push the branch:

```bash
git push -u origin feature/branch-name
```

## Learning Objectives

- Build backend applications with TypeScript and Node.js.
- Understand ES modules and TypeScript configuration.
- Structure applications using MVC architecture.
- Implement REST-style routes and HTTP methods.
- Work with server-side rendering using Nunjucks.
- Understand relational database schemas and SQL.
- Connect Node.js applications to SQLite.
- Implement database-driven CRUD functionality.
- Use prepared statements and parameterized queries.
- Manage database connections and application lifecycle.
- Work with Git branches and collaborative development workflows.

---

**Project:** Web Bootcamp Advanced  
**Focus:** TypeScript · Backend Development · MVC · SQL · SQLite  
**Runtime:** Node.js
