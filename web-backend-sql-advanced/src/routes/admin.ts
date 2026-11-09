
import { Router } from "express";

import {
  getAdmin,
  getNewPost,
  postNewPost,
  getEditPost,
  postEditPost,
  postDeletePost,
} from "../controllers/adminController.js";

const router = Router();

// READ
router.get("/", getAdmin);

// CREATE
router.get("/posts/new", getNewPost);
router.post("/posts", postNewPost);

// UPDATE
router.get("/posts/:slug/edit", getEditPost);
router.post("/posts/:slug", postEditPost);

// DELETE
router.post("/posts/:slug/delete", postDeletePost);

export default router;

