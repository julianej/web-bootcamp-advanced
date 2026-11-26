
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository.js';
import type { Comment, CommentPayload } from './comments.type.js';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
  ) {}

  findById(id: string): Comment {
    const comment = this.commentsRepository.findById(id);

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  findByThread(threadId: string): Comment[] {
    return this.commentsRepository.findByThread(threadId);
  }

  create(threadId: string, payload: CommentPayload): Comment {
    return this.commentsRepository.create(threadId, payload);
  }
}
