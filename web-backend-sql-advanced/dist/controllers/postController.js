import { loadPosts } from "../data/post.js";
import { slugify, formatDate } from "../utils/helper.js";
const PAGE_SIZE = 2;
// EXPORT CONTROLLER FUNCTIONS
export function getPosts(req, res) {
    // app.get("/", (req: Request, res: Response) => {
    const posts = loadPosts();
    const authorFilter = typeof req.query.author === "string" ? req.query.author.trim() : "";
    const sort = req.query.sort === "oldest" ? "oldest" : "newest";
    const page = typeof req.query.page === "string" &&
        Number.isInteger(Number(req.query.page))
        ? Math.max(1, Number(req.query.page))
        : 1;
    const filteredPosts = authorFilter
        ? posts.filter((post) => post.author.toLowerCase().includes(authorFilter.toLowerCase()))
        : posts;
    const sortedPosts = [...filteredPosts].sort((a, b) => sort === "oldest"
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt);
    const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pagedPosts = sortedPosts.slice(start, start + PAGE_SIZE);
    const view = pagedPosts.map((post) => ({
        ...post,
        slug: slugify(post.title),
        createdAt: formatDate(post.createdAt),
    }));
    // Render homepage
    res.render("index.html", {
        posts: view,
        controls: {
            author: authorFilter,
            sort,
            page: currentPage,
            totalPages,
            hasPrev: currentPage > 1,
            hasNext: currentPage < totalPages,
        },
    });
}
export function getPostBySlug(req, res) {
    // app.get("/posts/:slug", (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug)
        ? req.params.slug[0]
        : req.params.slug;
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
        res.status(400).send("Invalid slug");
        return;
    }
    // Find post
    const posts = loadPosts();
    const post = posts.find((p) => slugify(p.title) === slug);
    if (!post) {
        res.status(404).send("Post not found");
        return;
    } // Render post detail page
    res.render("post.html", {
        post: {
            ...post,
            createdAt: formatDate(post.createdAt),
        },
    });
}
//# sourceMappingURL=postController.js.map