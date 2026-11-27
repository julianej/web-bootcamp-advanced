
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';

import { ThreadsService } from './thread.service-typeorm.js';
import type { ThreadWithComments } from './thread.service-typeorm.js';

import { Thread } from './thread.entity.js';
import type {
  ThreadPayload,
  ThreadChanges,
} from './thread.entity.js';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() changes: ThreadChanges,
  ): Promise<Thread> {
    return this.threadsService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.threadsService.remove(id);
  }
}
