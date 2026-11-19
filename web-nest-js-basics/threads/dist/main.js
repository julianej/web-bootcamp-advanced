// The project comes from nest new --minimal, 
// and ThreadsService and ThreadsController live in src/main.ts, 
// registered in AppModule
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
// ========================================
// TYPE
// ========================================
// type Thread = {
//   id: string;
//   title: string;
//   author: string;
//   createdAt: Date;
// };
// ========================================
// SERVICE - injectable
// ========================================
// @Injectable()
// // TypeScript creates the threadsService property
// class ThreadsService {
//   private readonly threads: Thread[] = [
//     {
//       id: '1',
//       title: 'Welcome to the community',
//       author: 'Juliane',
//       createdAt: new Date('2026-11-12T08:15:00.000Z'),
//     },
//     {
//       id: '2',
//       title: 'What are you working on?',
//       author: 'Alex',
//       createdAt: new Date('2026-11-13T10:30:00.000Z'),
//     },
//     {
//       id: '3',
//       title: 'Learning NestJS',
//       author: 'Sarah',
//       createdAt: new Date('2026-11-14T14:45:00.000Z'),
//     },
//     {
//       id: '4',
//       title: 'Share your latest project',
//       author: 'Max',
//       createdAt: new Date('2026-11-15T09:00:00.000Z'),
//     },
//     {
//       id: '5',
//       title: 'Weekend discussions',
//       author: 'Emma',
//       createdAt: new Date('2026-11-16T18:20:00.000Z'),
//     },
//   ];
//   findAll(): Thread[] {
//     return this.threads;
//   }
// }
// ========================================
// CONTROLLER - HTTP request /only calls the service
// ========================================
// GET /threads returns the five sample threads as a JSON array
// @Controller()
// export class ThreadsController {
//     // TypeScript creates the threadsService property and NestJS injects its instance.
//   constructor(
//     private readonly threadsService: ThreadsService,
//   ) {}
//   @Get('threads')
//   findAll(): Thread[] {
//     return this.threadsService.findAll();
//   }
// }
// ========================================
// MODULE
// ========================================
// registered in AppModule
// @Module({
//   controllers: [ThreadsController],
//   providers: [ThreadsService],
// })
// class AppModule {}
// ========================================
// BOOTSTRAP
// ========================================
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3002);
}
void bootstrap();
//# sourceMappingURL=main.js.map