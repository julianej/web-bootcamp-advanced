console.log("Hello via Bun!");

import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";

const app = express();
const PORT = 3000;

// Configure Nunjucks
nunjucks.configure(path.resolve("views"), {
  autoescape: true,
  express: app,
  watch: false,
});

// Serve static files
app.use(express.static(path.resolve("public")));

// Home route
app.get("/", (req, res) => {
  res.render("index.njk", {
    posts: [],
  });
});

app.get("/posts/:slug", (req, res) => {
  res.render("post.njk", {
    post: {},
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.njk");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
