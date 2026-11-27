import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Thread } from './thread.entity.js';
import type { ThreadChanges } from './thread.entity.js';
import { CreateThreadDto } from './create-thread.dto.js';

import { Comment } from '../comments/comments.entity.js';
import { CreateCommentDto } from '../comments/create-comment.dto.js';

import { CommentsService } from '../comments/comments.service.js';

// import { ThreadPayload } from './thread.entity.js';



export type ThreadWithComments = Thread & {
  comments: Comment[];
};

// An empty database is the normal start. If you want sample threads to try things out,
const sampleThreads: Pick<
  Thread,
  'title' | 'author' | 'body'
>[] = [
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

    // PROPERTY: findBYThread
  const comments = await this.commentsService.findByThread(id);

  return {
    ...thread,
    comments,
  };
}

  // POST /threads/:id/comments
async addComment(
  threadId: string,
  payload: CreateCommentDto,
): Promise<Comment> {
  const thread = await this.threadsRepository.findOneBy({
    id: threadId,
  });

  if (!thread) {
    throw new NotFoundException(
      `Thread with ID ${threadId} not found`,
    );
  }

  return this.commentsService.create(threadId, payload);
}

// POST /threads
// create(data: ThreadPayload): Thread {
//   return this.threadsRepository.create(data);
// }

async create(payload: CreateThreadDto): Promise<Thread> {
  const thread = this.threadsRepository.create(payload);
  return this.threadsRepository.save(thread);
}

// PATCH /threads/:id
async update(
  id: string,
  changes: ThreadChanges,
): Promise<Thread> {
  const thread = await this.threadsRepository.findOneBy({ id });

  if (!thread) {
    throw new NotFoundException(`Thread with ID ${id} not found`);
  }

  // Only update title and body
  if (changes.title !== undefined) {
    thread.title = changes.title;
  }

  if (changes.body !== undefined) {
    thread.body = changes.body;
  }

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

export type ThreadWithCommentCount = Thread & {
  commentCount: number;
};
