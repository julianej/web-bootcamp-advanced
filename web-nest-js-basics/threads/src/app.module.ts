import { Module } from '@nestjs/common';
import { ThreadsController } from './threads/thread.controller.js';
import { ThreadsService } from './threads/thread.service.js';

import { AuthorController } from './authors/author.controller.js';
import { AuthorService } from './authors/author.service.js';

@Module({
  imports: [],
  controllers: [ThreadsController, AuthorController],
  providers: [ThreadsService, AuthorService ],
})
export class AppModule {}