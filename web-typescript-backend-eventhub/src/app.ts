import express from "express";
import nunjucks from "nunjucks";
import cors from "cors";
import type { Request, Response } from "express";

import path from "node:path";
import { fileURLToPath } from "node:url";

const events = [
  {
    name: "React Conf",
    date: "June 10, 2025",
    location: "Berlin",
    soldOut: false,
  },
  {
    name: "Vue.js Summit",
    date: "July 2, 2025",
    location: "Amsterdam",
    soldOut: true,
  },
  {
    name: "Node.js Interactive",
    date: "August 15, 2025",
    location: "London",
    soldOut: false,
  },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Create Express application
const app = express();

// 2. Configure middleware
app.use(cors());


// 3. Configure Nunjucks
nunjucks.configure(path.resolve(__dirname, "../views"), {
  autoescape: true,
  express: app,
  watch: true,
});


// 4. Define GET route
app.get("/", (req: Request, res: Response) => {
  res.render("index.njk");
});


app.get("/events", (req: Request, res: Response) => {
  res.render("events.njk", {
    events: events,
  });
});


app.use(express.static(path.resolve(__dirname, "../public")));


// 5. Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
