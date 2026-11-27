import { Injectable, NotFoundException } from '@nestjs/common';

import { Comment } from './comments.entity.js';
import type { CommentPayload } from './comments.entity.js';

// TYPEORM REPO
// OLD // import { CommentsRepository } from './comments.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
  // private readonly commentsRepository: CommentsRepository,) {}
  // NEW // Repository<Comment>
  // You can now delete: comments.repository.ts
  @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  // findById(id: string): Comment {
  // const comment = this.commentsRepository.findById(id);
  async findById(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOneBy({ id });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`)
      ;
    }

    return comment;
  }


// GET comments belonging to a thread
async findByThread(threadId: string): Promise<Comment[]> {
  return this.commentsRepository.find({
    where: { threadId },
    order: {
      createdAt: 'ASC',
    },
  });
}

  //OLD/// create(threadId: string, payload: CommentPayload): Comment {
  //   return this.commentsRepository.create(threadId, payload);
  // }

  // POST /threads/:threadId/comments
  async create(
    threadId: string,
    payload: CommentPayload,
  ): Promise<Comment> {
    const comment = this.commentsRepository.create({
      ...payload,
      threadId,
    });

    return this.commentsRepository.save(comment);
  }

  //OLD/// deleteByThread(threadId: string): void {
  //   this.commentsRepository.deleteByThread(threadId);
  // }

  // DELETE /comments/:id
  async markDeleted(id: string): Promise<Comment> {
    const comment = await this.findById(id);

    comment.body = 'deleted';

    return this.commentsRepository.save(comment);
  }

  async deleteByThread(threadId: string): Promise<void> {
    await this.commentsRepository.delete({
      threadId,
    });
  }

  // Count comments belonging to one thread
  async countByThread(threadId: string): Promise<number> {
    return this.commentsRepository.countBy({ threadId });
  }
}

