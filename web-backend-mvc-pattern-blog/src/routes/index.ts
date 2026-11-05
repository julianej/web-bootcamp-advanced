import { Router } from "express";
import { getPosts, getPostBySlug, getExamplePost, } from "../controllers/postController.js";
import { getAdmin } from "../controllers/adminController.js";

const router = Router();

// CHANGE ROUTES TO USE CONTROLLER FUNCTIONS with router.get and router.get

// Home route
// app.get("views/contact", (_req: Request, res: Response) => {
//   res.render("contact.html");
// });

// app.get("views/about", (_req: Request, res: Response) => {
//   res.render("about.html");
// });

// app.get("views/example-post", (_req: Request, res: Response) => {
//   res.render("postExample.html");
// });


// Home route
router.get("/", getPosts);

// Slug routes
router.get("/posts/:slug", getPostBySlug);

// Static example post
router.get("/example-post", getExamplePost);

// About page
router.get("/about", (_req, res) => {
  res.render("about.njk");
});

// NEW Admin page
router.get("/admin", getAdmin);

// Contact page
router.get("/contact", (_req, res) => {
  res.render("contact");
});

// Export router
export default router;
