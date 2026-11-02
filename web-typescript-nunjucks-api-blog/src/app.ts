
import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";

import postsData from "./posts.json" with { type: "json" };
import type { BlogPost } from "./types.js";
import { slugify } from "./utils/slugify.js";


// Express setup
const app = express();
const PORT = 3000;

// Blog data
const posts: BlogPost[] = postsData;

// Transform blog data for the templates
const formattedPosts = posts.map((post) => ({
  ...post,
  slug: slugify(post.title),
  date: new Date(post.createdAt * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
}));

// Nunjucks configuration
nunjucks.configure(path.resolve("views"), {
  autoescape: true,
  express: app,
  watch: false,
});

// Static files
app.use(express.static(path.resolve("public")));

// Home page
app.get("/", (req, res) => {
  res.render("index.njk", {
    posts: formattedPosts,
  });
});

// Blog post detail page
app.get("/posts/:slug", (req, res) => {
  const post = formattedPosts.find(
    (post) => post.slug === req.params.slug
  );

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("post.njk", {
    post,
  });
});

// Contact page
app.get("/contact", (req, res) => {
  res.render("contact.njk");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
