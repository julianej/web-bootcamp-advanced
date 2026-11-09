// src/models/postModel.ts
// Reads, creates, updates and deletes posts using SQL

import type { Post } from "../data/post.js";
import { connectDB } from "./createDatabase.js";
import { slugify } from "../utils/helper.js";


// TASK: Refactor the postModels.ts file to use SQL for all CRUD operations.
// - No let posts: Post[].
// - No seedPosts import.
// - No writePosts().
// - No array-based .find(), .push() or .filter() for persistence.
// - All SQL values use parameterized queries.


// ========================================
// READ ALL POSTS
// ========================================

// Database post includes the unique slug
export type PostWithSlug = Post & {
  slug: string;
};

// READ ALL POSTS
export function loadPosts(): PostWithSlug[] {
  const db = connectDB();

  return db
    .prepare("SELECT * FROM posts ORDER BY createdAt DESC")
    .all() as PostWithSlug[];
}


// ========================================
// READ ONE POST BY SLUG
// ========================================

// OLD OPERATION: Find one post by slug
// export function getPostBySlug(slug: string): Post | undefined {
//   return posts.find((post) => slugify(post.title) === slug);
// }

// READ ONE POST BY SLUG
// The SQL replacement is
export function getPostBySlug(slug: string): PostWithSlug | undefined {
  const db = connectDB();

  return db
    .prepare("SELECT * FROM posts WHERE slug = ?")
    .get(slug) as PostWithSlug | undefined;
}



// CREATE POST
// export function createPost(post: PostWithSlug): void {


// ========================================
// CREATE POST
// ========================================

export function addPost(
  post: Omit<PostWithSlug, "slug" | "createdAt">
): void {
  const db = connectDB();

  const slug = slugify(post.title);
  const createdAt = Math.floor(Date.now() / 1000);

  db.prepare(`
    INSERT INTO posts (
      title,
      image,
      author,
      createdAt,
      teaser,
      content,
      slug
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    post.title,
    post.image,
    post.author,
    createdAt,
    post.teaser,
    post.content,
    slug
  );
}



// ========================================
// UPDATE POST
// ========================================

export function updatePost(
  currentSlug: string,
  // updatedPost: PostWithSlug
  changes: Partial<Omit<PostWithSlug, "slug" | "createdAt">>
): boolean {
  const db = connectDB();

  const existingPost = getPostBySlug(currentSlug);

  if (!existingPost) {
    return false;
  }

  const updatedTitle = changes.title ?? existingPost.title;

  const updatedSlug = changes.title
    ? slugify(updatedTitle)
    : existingPost.slug;

  const result = db.prepare(`
    UPDATE posts
    SET
      title = @title,
      image = @image,
      author = @author,
      teaser = @teaser,
      content = @content,
      slug = @slug
    WHERE slug = @currentSlug
  `).run({
    // ADD the existing post's properties as defaults
     title: updatedTitle,
    image: changes.image ?? existingPost.image,
    author: changes.author ?? existingPost.author,
    teaser: changes.teaser ?? existingPost.teaser,
    content: changes.content ?? existingPost.content,
    // Use the new slug if the title changed, otherwise keep the existing slug
    slug: updatedSlug,
    currentSlug,
  });

  return result.changes > 0;
}

// ========================================
// DELETE POST
// ========================================

// DELETE POST
export function deletePost(slug: string): boolean {
  const db = connectDB();

  const result = db
    .prepare("DELETE FROM posts WHERE slug = ?")
    .run(slug);

  return result.changes > 0;
}


