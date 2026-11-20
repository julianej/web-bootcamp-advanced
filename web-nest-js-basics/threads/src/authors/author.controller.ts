import { Controller, Get, Query } from '@nestjs/common';
import { ThreadsService } from '../threads/thread.service.js';

//HTTP REQUEST RESPONSE cycle
// You could also define a route prefix here, for example: 'threads'
@Controller('authors')
export class AuthorController {
  constructor(
    private readonly threadsService: ThreadsService,
  ) {}

  @Get()
  findAllAuthors() {
    return this.threadsService.findAllAuthors();
  }
}
