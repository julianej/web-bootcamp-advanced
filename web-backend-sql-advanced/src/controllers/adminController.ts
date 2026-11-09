
import type { Request, Response } from "express";

import {
  loadPosts,
  getPostBySlug,
  addPost,
  updatePost,
  deletePost,
} from "../models/postModels.js";

import { formatDate } from "../utils/helper.js";

// ========================================
// READ ALL POSTS
// GET /admin
// ========================================

export function getAdmin(_req: Request, res: Response): void {
  const posts = loadPosts();

  const adminPosts = posts.map((post) => ({
    ...post,
    createdAt: formatDate(post.createdAt),
  }));

  // SQLite query and controller are returning post data.
  console.log("ADMIN POSTS:", adminPosts);
  console.log("TOTAL POSTS:", adminPosts.length);

  res.render("admins/index.njk", {
    title: "Admin Dashboard",
    posts: adminPosts,
    totalPosts: adminPosts.length,
  });
}

// ========================================
// SHOW CREATE FORM
// GET /admin/posts/new
// ========================================

export function getNewPost(_req: Request, res: Response): void {
  res.render("admins/postForm.njk", {
    title: "Create New Post",
  });
}

// ========================================
// CREATE POST
// POST /admin/posts
// ========================================

export async function postNewPost(
  req: Request,
  res: Response
): Promise<void> {
  const { title, image, author, teaser, content } = req.body;

  await addPost({
    title,
    image,
    author,
    teaser,
    content,
  });

  res.redirect("/admin");
}

// ========================================
// SHOW EDIT FORM
// GET /admin/posts/:slug/edit
// ========================================

export function getEditPost(req: Request, res: Response): void {
  const { slug } = req.params;

  const post = getPostBySlug(slug);

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("admins/postForm.njk", {
    title: "Edit Post",
    post,
  });
}

// ========================================
// UPDATE POST
// POST /admin/posts/:slug
// ========================================

export async function postEditPost(
  req: Request,
  res: Response
): Promise<void> {
  const { slug } = req.params;

  const { title, image, author, teaser, content } = req.body;

  const success = await updatePost(slug, {
    title,
    image,
    author,
    teaser,
    content,
  });

  if (!success) {
    res.status(404).send("Post not found");
    return;
  }

  res.redirect("/admin");
}

// ========================================
// DELETE POST
// POST /admin/posts/:slug/delete
// ========================================

export async function postDeletePost(
  req: Request,
  res: Response
): Promise<void> {
  const { slug } = req.params;

  const success = await deletePost(slug);

  if (!success) {
    res.status(404).send("Post not found");
    return;
  }

  res.redirect("/admin");
}
