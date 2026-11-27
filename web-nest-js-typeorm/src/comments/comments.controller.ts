
import { Controller, Get, Delete, Param } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import type { Comment } from './comments.type.js';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  // @Get(':id')
  // findById(@Param('id') id: string): Comment {
 @Get(':id')
  findById(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findById(id);
  }

 @Delete(':id')
  markDeleted(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.markDeleted(id);
  }
}
