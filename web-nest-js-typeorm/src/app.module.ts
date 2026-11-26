import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThreadsModule } from './threads/thread.module.js';
import { CommentsModule } from './comments/comments.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/cyber-chat.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ThreadsModule,
    CommentsModule,
  ],
})
export class AppModule {}

// Option B — Separate the authors endpoint

// @Module({
//   imports: [],
//   controllers: [ThreadsController, AuthorController],
//   providers: [ThreadsService, AuthorService],
// })
// export class AppModule {}
