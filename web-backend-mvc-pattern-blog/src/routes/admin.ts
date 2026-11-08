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

adminRouter.get("/", getAdmin);

adminRouter.get("/posts/new", getNewPost);
adminRouter.post("/posts", createPost);

adminRouter.get("/posts/:slug/edit", getEditPost);
adminRouter.post("/posts/:slug", updatePost);
adminRouter.post("/posts/:slug/delete", deletePost);

export default adminRouter;