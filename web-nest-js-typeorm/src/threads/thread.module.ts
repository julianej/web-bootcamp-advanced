import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Thread } from './thread.entity.js';
import { ThreadsController } from './thread.controller-typeorm.js';
import { ThreadsService } from './thread.service-typeorm.js';
import { CommentsModule } from '../comments/comments.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Thread]),
    CommentsModule,
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}

