
// Since your CommentsService now uses TypeORM's Repository<Comment> directly, 
// you no longer need comments.repository.ts.
// import { CommentsRepository } from './comments.repository.js';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './comments.entity.js';
import { CommentsService } from './comments.service.js';
import { CommentsController } from './comments.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}

// @Module({
//   providers: [
//     CommentsService,
//     CommentsRepository,
//   ],
//   exports: [CommentsService],
// })
// export class CommentsModule {}

