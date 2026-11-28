export type Thread = {
  id: string;
  title: string;
  author: string;
  body: string;
  createdAt: Date;
};


// This tells TypeScript:
// - author must exist.
// - body must exist.

// with DTO not longer needed:
// // export type ThreadPayload = Pick< Thread,'title' | 'author' | 'body'>;