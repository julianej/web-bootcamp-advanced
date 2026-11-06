//controllers/adminControllers.ts
import { loadPosts } from "../models/postModels.js";
import type { Request, Response } from "express";
import { slugify,formatDate } from "../utils/helper.js";

// GET /admin route handler
export function getAdmin(_req: Request, res: Response): void {
  console.log("Admin route called");

  const posts = loadPosts();

  console.log("Admin posts:", posts.length);
  console.log("Admin titles:", posts.map(post => post.title));

  console.log("Admin posts:", posts.length);

  const adminPosts = posts.map((post) => ({
    ...post,
    slug: slugify(post.title),
    createdAt: formatDate(post.createdAt),
  }));

// POSSIBLE like that: res.render("admin.njk", {
  res.render("admin.njk", {
    title: "Admin Dashboard",
    posts: adminPosts,
    // Additional data for the admin dashboard can be passed here
    totalPosts: adminPosts.length,
  });
}