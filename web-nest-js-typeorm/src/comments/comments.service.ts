
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

  async deleteByThread(threadId: string): Promise<void> {
    await this.commentsRepository.delete({ threadId });
  }

  async markDeleted(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOneBy({ id });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    const deletedComment = {
      ...comment,
      body: 'deleted',
    };

    return this.commentsRepository.save(deletedComment);
  }
}
