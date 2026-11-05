// models/postModel.ts
// Reads, creates, updates and deletes posts

import { seedPosts } from "../data/post.js";
import type { Post } from "../data/post.js";

// In-memory storage
let posts: Post[] = [...seedPosts];

// READ all posts
export function loadPosts(): Post[] {
  return posts;
}

// READ one post
export function getPostById(id: number): Post | undefined {
  return posts[id];
}

// CREATE
export function createPost(post: Post): void {
  posts.push(post);
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