import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Thread, ThreadPayload } from './thread.entity.js';
import { CommentsService } from '../comments/comments.service.js';
import type { Comment, CommentPayload } from '../comments/comments.type.js';

export type ThreadWithComments = Thread & {
  comments: Comment[];
};

// An empty database is the normal start. If you want sample threads to try things out,
const sampleThreads: ThreadPayload[] = [
  {
    title: "Tabs or spaces, final answer?",
    author: "pixelpirate",
    body: "My team argues about this in every code review. What does your formatter do?",
  },
  {
    title: "Is SQLite enough for a side project?",
    author: "neonbyte",
    body: "I expect maybe a hundred users. Do I really need a database server?",
  },
];

@Injectable()
export class ThreadsService implements OnApplicationBootstrap {

  // You injected REPOSITORY through the constructor:
  // OLD private readonly threadsRepository: ThreadsRepository
  constructor(
    @InjectRepository(Thread)
    private readonly threadsRepository: Repository<Thread>,
    private readonly commentsService: CommentsService,
  ) {}

  // GET /threads
  // Every repository method returns a Promise.
  async findAll(author?: string): Promise<Thread[]> {
  return this.threadsRepository.find({
    where: author !== undefined ? { author } : {},
    order: {
      createdAt: 'DESC',
    },
  });
}

  // TypeORM database operations are asynchronous. That's why we now use:
  // GET /threads/:id
  async findOne(id: string): Promise<ThreadWithComments> {
    const thread = await this.threadsRepository.findOneBy({ id });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }

    return {
      ...thread,
      comments: this.commentsService.findByThread(id),
    };
  }

  // POST /threads/:id/comments
  async addComment(
    threadId: string,
    payload: CommentPayload,
  ): Promise<Comment> {
    // First verify that the thread exists
    await this.findOne(threadId);

    // Then create the comment
    return this.commentsService.create(threadId, payload);
  }

// POST /threads
// create(data: ThreadPayload): Thread {
//   return this.threadsRepository.create(data);
// }

  async create(payload: ThreadPayload): Promise<Thread> {
    const thread = this.threadsRepository.create(payload);

    return this.threadsRepository.save(thread);
  }

  // GET /authors
  async findAllAuthors(): Promise<{ author: string; threads: number }[]> {
    const authors = await this.threadsRepository
      .createQueryBuilder('thread')
      .select('thread.author', 'author')
      .addSelect('COUNT(*)', 'threads')
      .groupBy('thread.author')
      .orderBy('COUNT(*)', 'DESC')
      .addOrderBy('thread.author', 'ASC')
      .getRawMany<{ author: string; threads: string | number }>();

    return authors.map((author) => ({
      author: author.author,
      threads: Number(author.threads),
    }));
  }

// DELETE /threads/:id
// DELETE /threads/:id
async remove(id: string): Promise<void> {
  const result = await this.threadsRepository.delete(id);

  if (result.affected === 0) {
    throw new NotFoundException(`Thread with ID ${id} not found`);
  }

  await this.commentsService.deleteByThread(id);
}

  // FOR TESTING SAMPLE DATA
  async onApplicationBootstrap(): Promise<void> {
    if ((await this.threadsRepository.count()) > 0) return;

    const threads = this.threadsRepository.create(sampleThreads);

    await this.threadsRepository.save(threads);
  }
}
