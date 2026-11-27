import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThreadsModule } from './threads/thread.module.js';
import { CommentsModule } from './comments/comments.module.js';

import { ConfigModule, ConfigService } from '@nestjs/config';

// Make sure the data directory exists in your project root.
// mkdir -p data

// PREVIOUSLY
// TypeOrmModule.forRoot({
//   type: 'better-sqlite3',
//   database: 'data/cyber-chat.sqlite',
//   synchronize: true,
//   autoLoadEntities: true,
// })

@Module({
  imports: [
    // Loads .env
    ConfigModule.forRoot(),

    // Configures TypeORM asynchronously
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

       useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        // Requires DATABASE_PATH
        database: configService.getOrThrow<string>('DATABASE_PATH'),
          synchronize: false,
        autoLoadEntities: true,
      }),
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
