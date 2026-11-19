import { Controller, Get, Query } from '@nestjs/common';
import { ThreadsService } from './thread.service.js';
import type { Thread } from './thread.type.js';

@Controller()
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
  ) {}

  @Get('threads')
  findAll(@Query('author') author?: string): Thread[] {
    return this.threadsService.findAll(author);
  }
}