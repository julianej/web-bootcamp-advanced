export interface Comment {
  id: string;
  threadId: string;
  author: string;
  body: string;
  createdAt: Date;
}


// Pick is a TypeScript utility type 
// that selects certain properties from an existing type.

// export type CommentPayload = Pick<Comment, 'author' | 'body'>;

// This tells TypeScript:
// - title must exist.
// - author must exist.
// - body must exist.

// Remove the old payload types:
// DTO classes replace the old payload types 
// by taking over the same responsibility, but with additional runtime validation.

