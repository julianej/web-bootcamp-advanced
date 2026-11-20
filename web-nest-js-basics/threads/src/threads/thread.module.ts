import { Module } from '@nestjs/common';
import { ThreadsController } from './thread.controller.js';
import { ThreadsService } from './thread.service.js';
import { ThreadsRepository } from './thread.repositories.js';

@Module({
  controllers: [ThreadsController],
  providers: [
    ThreadsService,
    ThreadsRepository,
  ],
})
export class ThreadsModule {}
