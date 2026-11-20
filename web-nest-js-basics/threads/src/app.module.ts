import { Module } from '@nestjs/common';
import { ThreadsController } from './threads/thread.controller.js';
import { ThreadsService } from './threads/thread.service.js';
import { ThreadsModule } from './threads/thread.module.js';


// You need to decide which controller owns that endpoint.
// Option A — Keep the authors endpoint inside ThreadsController

@Module({
  imports: [ThreadsModule],
})
export class AppModule {}

// Option B — Separate the authors endpoint

// @Module({
//   imports: [],
//   controllers: [ThreadsController, AuthorController],
//   providers: [ThreadsService, AuthorService],
// })
// export class AppModule {}
