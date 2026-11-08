//controllers/adminControllers.ts
import { loadPosts } from "../models/postModels.js";
import type { Post } from "../data/post.js";
import type { Request, Response } from "express";
import { slugify, formatDate } from "../utils/helper.js";

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

// GET /admin/posts/new
export function getNewPost(_req: Request,res: Response): void {
  res.render("admins/postForm.njk", {
    title: "Create Post",
    isEdit: false,
    formAction: "/admin/posts",
    post: {
      title: "",
      image: "",
      author: "",
      teaser: "",
      content: "",
    },
  });
}

// GET /admin/posts/:slug/edit
export function getEditPost(req: Request, res: Response): void {
  const slug = req.params.slug;

  const post = loadPosts().find(
    (post) => slugify(post.title) === slug
  );

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("admins/postForm.njk", {
    title: "Edit Post",
    isEdit: true,
    formAction: `/admin/posts/${slug}`,
    post,
  });
}


// POST /admin/posts
export function createPost(req: Request, res: Response): void {
  console.log("CREATE POST called");
  console.log("Form data:", req.body);

  const posts = loadPosts();

  const { title, image, author, teaser, content } = req.body;

  const newPost: Post = {
    title,
    image,
    author,
    teaser,
    content,
    createdAt: Math.floor(Date.now() / 1000),
  };

  posts.push(newPost);

  console.log("Posts after creation:", posts.length);

  res.redirect("/admin");
}

// POST /admin/posts/:slug
// UPDATE: Save changes to an existing post
export function updatePost(req: Request, res: Response): void {
  const posts = loadPosts();
  const { slug } = req.params;

  const postIndex = posts.findIndex(
    (post) => slugify(post.title) === slug
  );

  if (postIndex === -1) {
    res.status(404).send("Post not found");
    return;
  }

  const { title, image, author, teaser, content } = req.body;

  posts[postIndex] = {
    ...posts[postIndex],
    title,
    image,
    author,
    teaser,
    content,
  };

  res.redirect("/admin");
}

// POST /admin/posts/:slug/delete
// DELETE: Remove an existing post
export function deletePost(req: Request, res: Response): void {
  const posts = loadPosts();
  const { slug } = req.params;

  const postIndex = posts.findIndex(
    (post) => slugify(post.title) === slug
  );

  if (postIndex === -1) {
    res.status(404).send("Post not found");
    return;
  }

  posts.splice(postIndex, 1);

  res.redirect("/admin");
}