// src/routes/admin.ts

import express from "express";
import { getAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.get("/admin", getAdmin);

export default router;