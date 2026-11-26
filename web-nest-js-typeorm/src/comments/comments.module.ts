import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { CommentsRepository } from './comments.repository.js';

@Module({
  providers: [
    CommentsService,
    CommentsRepository,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}

