// app.ts 
// Configure Express, Nunjucks and static files
import adminRouter from "./routes/admin.js";


// REMOVE import express, { type Request, type Response } from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Import the router from the routes directory
import express from "express";
import router from "./routes/index.js";

const app = express();

/// MOVE TO DATA POST
// interface Post {
//   title: string;
//   image: string;
//   author: string;
//   createdAt: number;
//   teaser: string;
//   content: string;
// }

// const PAGE_SIZE = 2;


// // Resolve project directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
console.log("Project root:", projectRoot);
console.log("Current directory:", __dirname);
// const assetsDir = path.join(projectRoot, "public", "assets");
// const cssDir = path.join(projectRoot, "public", "css");


// Configure Nunjucks in app.ts Template engine
// app.set("view engine", "njk");
// app.set("views", "./views");

// OLD nunjucks.configure(projectRoot, { autoescape: true, express: app });
nunjucks.configure(
  path.join(projectRoot, "/views"),
  {
    autoescape: true,
    express: app,
    watch: true, // Enable template watching for development
  },
);

app.set("view engine", "njk");

// Static files
// app.use(express.static("public"));
app.use(express.static(path.join(projectRoot, "/public")));

// app.use("/assets", express.static(assetsDir));
// app.use("/css", express.static(cssDir));

// Parse HTML form submissions
app.use(express.urlencoded({ extended: true }));

// Parse JSON requests
app.use(express.json());

// Mount router
app.use("/", router);
app.use("/admin", adminRouter);

////// DATA POST
// const seedPosts: Post[] = [
//   {
//     title: "Black: The Absence, Not the Presence, of Color",
//     image: "colorful-umbrella.jpg",
//     author: "Peter Parker",
//     createdAt: 1743120000,
//     teaser:
//       "Scientifically, black is not a color but rather the absence of all colors, occurring when an object absorbs nearly all light wavelengths instead of reflecting them.",
//     content:
//       "<p>When you think about the rainbow, you see a vibrant spectrum of hues. But black does not appear in that spectrum the same way red or blue does.</p><p>From a scientific perspective, black is usually the absence of visible light, not a reflected wavelength.</p>",
//   },
//   {
//     title: "Flowers: Nature's Muse for Design",
//     image: "flowers.jpg",
//     author: "Peter Parker",
//     createdAt: 1745452800,
//     teaser:
//       "Flowers inspire design with their color palettes, structure, and balance between repetition and variation.",
//     content:
//       "<p>Designers borrow from flowers all the time: layered composition, contrasting accents, and natural hierarchy.</p>",
//   },
//   {
//     title: "UDesign's Harmony: Core Purpose and Supporting Details",
//     image: "sailing.jpg",
//     author: "Peter Parker",
//     createdAt: 1748736000,
//     teaser:
//       "Strong design starts with one clear core idea, then adds supporting details that reinforce it.",
//     content:
//       "<p>A useful mental model is major and minor elements. Major elements communicate the main point, minor elements support it without stealing focus.</p>",
//   },
// ];


//// DATA LOAD POSTS FROM JSON FILE
// function loadPosts(): Post[] {
//   return seedPosts;
// }

// HELPER TITLE: Load posts from JSON file
// function slugify(title: string): string {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-|-$/g, "");
// }

// function formatDate(unix: number): string {
//   return new Date(unix * 1000).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }


// HANDLERS 
// app.get("/", (req: Request, res: Response) => {
//   const posts = loadPosts();

//   const authorFilter =
//     typeof req.query.author === "string" ? req.query.author.trim() : "";
//   const sort = req.query.sort === "oldest" ? "oldest" : "newest";
//   const page =
//     typeof req.query.page === "string" &&
//     Number.isInteger(Number(req.query.page))
//       ? Math.max(1, Number(req.query.page))
//       : 1;

//   const filteredPosts = authorFilter
//     ? posts.filter((post) =>
//         post.author.toLowerCase().includes(authorFilter.toLowerCase()),
//       )
//     : posts;

//   const sortedPosts = [...filteredPosts].sort((a, b) => {
//     if (sort === "oldest") {
//       return a.createdAt - b.createdAt;
//     }
//     return b.createdAt - a.createdAt;
//   });

//   const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
//   const currentPage = Math.min(page, totalPages);
//   const start = (currentPage - 1) * PAGE_SIZE;
//   const pagedPosts = sortedPosts.slice(start, start + PAGE_SIZE);

//   const view = pagedPosts.map((post) => ({
//     ...post,
//     slug: slugify(post.title),
//     createdAt: formatDate(post.createdAt),
//   }));

//   res.render("index.html", {
//     posts: view,
//     controls: {
//       author: authorFilter,
//       sort,
//       page: currentPage,
//       totalPages,
//       hasPrev: currentPage > 1,
//       hasNext: currentPage < totalPages,
//     },
//   });
// });


// app.get("/posts/:slug", (req: Request, res: Response) => {
//   const slug = Array.isArray(req.params.slug)
//     ? req.params.slug[0]
//     : req.params.slug;

//   if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
//     res.status(400).send("Invalid slug");
//     return;
//   }

//   const posts = loadPosts();
//   const post = posts.find((p) => slugify(p.title) === slug);
//   if (!post) {
//     res.status(404).send("Post not found");
//     return;
//   }
//   res.render("post.html", {
//     post: { ...post, createdAt: formatDate(post.createdAt) },
//   });
// });


// START SERVER
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
