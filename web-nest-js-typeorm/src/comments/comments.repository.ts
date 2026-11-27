
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Comment, CommentPayload } from './comments.type.js';

@Injectable()
export class CommentsRepository {
  private readonly comments = new Map<string, Comment>();

  findById(id: string): Comment | undefined {
    return this.comments.get(id);
  }

  findByThread(threadId: string): Comment[] {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.threadId === threadId,
    );
  }

  create(threadId: string, payload: CommentPayload): Comment {
    const comment: Comment = {
      id: randomUUID(),
      threadId,
      ...payload,
      createdAt: new Date(),
    };

    this.comments.set(comment.id, comment);

    return comment;
  }

  update(id: string, changes: Partial<Comment>): Comment {
    const comment = this.comments.get(id);

    if (!comment) {
      throw new Error(`Comment with ID ${id} not found`);
    }

    const updatedComment = {
      ...comment,
      ...changes,
    };

    this.comments.set(id, updatedComment);

    return updatedComment;
  }

  // Your existing findById(), findByThread() and create() methods...

  deleteByThread(threadId: string): void {
    for (const [id, comment] of this.comments.entries()) {
      if (comment.threadId === threadId) {
        this.comments.delete(id);
      }
    }
  }
}
