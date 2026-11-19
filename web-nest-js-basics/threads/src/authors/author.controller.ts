import { Controller, Get } from '@nestjs/common';
import { ThreadsService } from '../threads/thread.service.js';

@Controller()
export class AuthorController {
  constructor(
    private readonly threadsService: ThreadsService,
  ) {}

  @Get('threads/authors')
  findAllAuthors() {
    return this.threadsService.findAllAuthors();
  }
}