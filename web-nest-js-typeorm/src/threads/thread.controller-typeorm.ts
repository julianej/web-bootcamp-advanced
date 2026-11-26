
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { ThreadsService } from './thread.service-typeorm.js';
import type { ThreadWithComments } from './thread.service-typeorm.js';

import { Thread } from './thread.entity.js';
import type { ThreadPayload } from './thread.entity.js';

import type {
  CommentPayload,
  Comment as ThreadComment,
} from '../comments/comments.type.js';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
  ) {}

  @Get()
  findAll(
    @Query('author') author?: string,
  ): Promise<Thread[]> {
    return this.threadsService.findAll(author);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<ThreadWithComments> {
    return this.threadsService.findOne(id);
  }

  @Post()
  create(
    @Body() body: ThreadPayload,
  ): Promise<Thread> {
    return this.threadsService.create(body);
  }

  @Post(':threadId/comments')
  addComment(
    @Param('threadId') threadId: string,
    @Body() payload: CommentPayload,
  ): Promise<ThreadComment> {
    return this.threadsService.addComment(threadId, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.threadsService.remove(id);
  }
}

/// ------ OLD ----- ////

//creates the URL: /threads GET /threads/

// @Controller('threads')
// export class ThreadsController {

//   // this ERROR: Property 'threadsService' does not exist on type 'ThreadsController'.
//   // demands a constructur
//   constructor(
//     private readonly threadsService: ThreadsService,
//   ) {}

//    @Get()
//   findAll(@Query('author') author?: string): Thread[] {
//     return this.threadsService.findAll(author);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Thread | undefined {
//     return this.threadsService.findOne(id);
//   }
//   // If the thread exists → returns Thread → HTTP 200

//   @Post()
//   create(@Body() body: Omit<Thread, 'id' | 'createdAt'>): Thread {
//     return this.threadsService.create(body);
//   }

//   @Post(':id/comments')
//     addComment(
//       @Param('id') threadId: string,
//       @Body() payload: CommentPayload,
//     ): Comment {
//       return this.threadsService.addComment(threadId, payload);
//     }
// }