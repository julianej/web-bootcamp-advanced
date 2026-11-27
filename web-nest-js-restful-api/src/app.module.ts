import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThreadsModule } from './threads/thread.module.js';
import { CommentsModule } from './comments/comments.module.js';

import { ConfigModule, ConfigService } from '@nestjs/config';

// ValidationPipe handles every controller method that takes a DTO-typed parameter. 
// including automated tests of the whole application.
// Reject Invalid Threads and Comments:
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

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
     // Load environment variables from .env
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
   providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // Only properties with validation decorators are allowed
        whitelist: true,
        // Rejects unknown properties instead of silently removing them
        forbidNonWhitelisted: true,
        // Converts incoming JSON into DTO instances
        // Data Transfer Object
        transform: true,
      }),
    },
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
