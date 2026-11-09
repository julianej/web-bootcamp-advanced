import { connectDB } from "./createDatabase.js";
import { seedPosts } from "../data/post.js";
import { slugify } from "../utils/helper.js";

export function seedDatabase(): void {
  const db = connectDB();

  // Check whether posts already exist
  // const result = db
    const count = db
    .prepare("SELECT COUNT(*) AS count FROM posts")
    .get() as { count: number };

  // Don't insert the same posts again
  if (count.count > 0) {
    console.log("Database already contains posts.");
    return;
  }

  const insertPost = db.prepare(`
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
      @content,
      @slug
    )
  `);

  // Your original seedPosts objects don't contain slugs.
  const insertMany = db.transaction(() => {
    for (const post of seedPosts) {
      insertPost.run({
        ...post,
        slug: slugify(post.title), 
      });
    }
  });

  insertMany();

  console.log(`${seedPosts.length} posts inserted successfully.`);
}