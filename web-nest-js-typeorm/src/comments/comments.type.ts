export interface Comment {
  id: string;
  threadId: string;
  author: string;
  body: string;
  createdAt: Date;
}


// Pick is a TypeScript utility type 
// that selects certain properties from an existing type.
export type CommentPayload = Pick<Comment, 'author' | 'body'>;