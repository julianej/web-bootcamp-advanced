import express from "express";
import nunjucks from "nunjucks";
import cors from "cors";

import type { Request, Response } from "express";

import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());

nunjucks.configure(path.join(__dirname, "templates"), {
  autoescape: true,
  express: app,
  watch: true,
});

app.get('/', function(req: Request, res: Response) {
      res.render("app.njk", {
        name: "Home",
      });
});

app.get('/about', function(req: Request, res: Response) {
      res.render("about.njk", {
        name: "About Juliane",
      });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});