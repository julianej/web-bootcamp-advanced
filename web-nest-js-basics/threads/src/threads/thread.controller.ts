
import { Body, Controller, Get, Query, Param, Post } from '@nestjs/common';
import { ThreadsService } from './thread.service.js';
import type { Thread } from './thread.type.js';

//creates the URL: /threads GET /threads/

@Controller('threads')
export class ThreadsController {

  // this ERROR: Property 'threadsService' does not exist on type 'ThreadsController'.
  // demands a constructur
  constructor(
    private readonly threadsService: ThreadsService,
  ) {}

   @Get()
  findAll(@Query('author') author?: string): Thread[] {
    return this.threadsService.findAll(author);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Thread | undefined {
    return this.threadsService.findOne(id);
  }
  // If the thread exists → returns Thread → HTTP 200

  @Post()
  create(@Body() body: Omit<Thread, 'id' | 'createdAt'>): Thread {
    return this.threadsService.create(body);
  }
}