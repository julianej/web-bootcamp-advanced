import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsController } from './thread.controller-typeorm.js';
import { ThreadsService } from './thread.service-typeorm.js';
import { Thread } from './thread.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Thread])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}



