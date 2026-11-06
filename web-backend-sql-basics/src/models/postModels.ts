// models/postModel.ts
// Reads, creates, updates and deletes posts

import { seedPosts } from "../data/post.js";
import type { Post } from "../data/post.js";
import { connectDB } from "./createDatabase.js";

// In-memory storage
let posts: Post[] = [...seedPosts];


// OLD in-memory storage
// READ all posts
// export function loadPosts(): Post[] {
//   return seedPosts;
// }

// // READ one post
// export function getPostById(id: number): Post | undefined {
//   return posts[id];
// }


// GET ALL POSTS
export function loadPosts(): Post[] {
  const db = connectDB();

  return db
    .prepare("SELECT * FROM posts ORDER BY createdAt DESC")
    .all() as Post[];
}

// GET ONE POST
export function loadPost(id: number): Post | undefined {
  const db = connectDB();

  return db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(id) as Post | undefined;
}

// CREATE
export function createPost(post: Post): void {
  const db = connectDB();

  db
    .prepare(`
      INSERT INTO posts (
        title,
        image,
        author,
        createdAt,
        teaser,
        content,
        slug
      )
      VALUES (
        @title,
        @image,
        @author,
        @createdAt,
        @teaser,
        @content
        @slug
      )
    `)
    .run(post);
}

// UPDATE
export function updatePost(id: number, updatedPost: Post): boolean {
  if (!posts[id]) return false;

  posts[id] = updatedPost;
  return true;
}

// DELETE
export function deletePost(id: number): boolean {
  if (!posts[id]) return false;

  posts.splice(id, 1);
  return true;
}