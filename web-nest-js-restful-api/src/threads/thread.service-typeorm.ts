import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Thread } from './thread.entity.js';

import { Comment } from '../comments/comments.entity.js';
import { CreateCommentDto } from '../comments/create-comment.dto.js';

import { CommentsService } from '../comments/comments.service.js';

import { CreateThreadDto } from './create-thread.dto.js';
import { UpdateThreadDto } from './update-thread.dto.js';
// import type { ThreadChanges } from './thread.entity.js';
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
  // NEW injected the TypeORM repository as this.threads.

  constructor(
    @InjectRepository(Thread)
    private readonly threads: Repository<Thread>,
    // private readonly threadsRepository: Repository<Thread>,
    private readonly commentsService: CommentsService,
  ) {}

  // GET /threads
  // Every repository method returns a Promise.
  async findAll(author?: string): Promise<Thread[]> {
  return this.threads.find({
    where: author !== undefined ? { author } : {},
    order: {
      createdAt: 'DESC',
    },
  });
}

  // TypeORM database operations are asynchronous. That's why we now use:
  // Finds the existing thread
  // GET /threads/:id
  async findOne(id: string): Promise<ThreadWithComments> {
    const thread = await this.threads.findOneBy({ id });

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
  const thread = await this.threads.findOneBy({
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
  const thread = this.threads.create(payload);
  return this.threads.save(thread);
}

// PATCH /threads/:id
// NEW
async update(
  id: string,
  dto: UpdateThreadDto,
): Promise<Thread> {
  const thread = await this.threads.findOneBy({ id });

  if (!thread) {
    throw new NotFoundException(`Thread with ID ${id} not found`);
  }

  this.threads.merge(thread, dto);
  //  Only update title and body
  // check for !== undefined
  // if (changes.title !== undefined) {
  //   thread.title = changes.title;
  // }

  // if (changes.body !== undefined) {
  //   thread.body = changes.body;
  // }

  // return this.threadsRepository.save(thread);
  return this.threads.save(thread);
}

// GET /authors
  async findAllAuthors(): Promise<{ author: string; threads: number }[]> {
    const authors = await this.threads
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
  const result = await this.threads.delete(id);

  if (result.affected === 0) {
    throw new NotFoundException(`Thread with ID ${id} not found`);
  }

  await this.commentsService.deleteByThread(id);
}

  // FOR TESTING SAMPLE DATA
  async onApplicationBootstrap(): Promise<void> {
    if ((await this.threads.count()) > 0) return;

    const threads = this.threads.create(sampleThreads);

    await this.threads.save(threads);
  }
}

export type ThreadWithCommentCount = Thread & {
  commentCount: number;
};
