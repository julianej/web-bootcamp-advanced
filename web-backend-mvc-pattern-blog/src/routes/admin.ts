// src/routes/admin.ts

import { Router } from "express";

import {
  getAdmin,
  getNewPost,
  createPost,
  getEditPost,
  updatePost,
  deletePost,
} from "../controllers/adminController.js";

const adminRouter = Router();

// READ: Display all posts
adminRouter.get("/", getAdmin);

// CREATE: Display form and submit new post
adminRouter.get("/posts/new", getNewPost);
adminRouter.post("/posts", createPost);

// UPDATE: Display edit form and submit changes
adminRouter.get("/posts/:slug/edit", getEditPost);
adminRouter.post("/posts/:slug", updatePost);

// DELETE: Remove post
adminRouter.post("/posts/:slug/delete", deletePost);

export default adminRouter;