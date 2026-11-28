import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { CommentsService } from './comments.service.js';
import type { Comment } from './comments.type.js';
import { CreateCommentDto } from './create-comment.dto.js';


// @Controller('comments')
// export class CommentsController {
//   constructor(
//     private readonly commentsService: CommentsService,
//   ) {}


// POST /threads/:id/comments
@Controller('threads/:id/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  // /threads/:id/comments/:commentId
  @Get(':commentId')
  findById(
    @Param('commentId') commentId: string,
  ): Promise<Comment> {
    return this.commentsService.findById(commentId);
  }

// OLD //  @Get(':id')
// findById(@Param('id') id: string): Comment {

  @Post()
  create(
    @Param('id') threadId: string,
    @Body() payload: CreateCommentDto,
  ) {
    return this.commentsService.create(threadId, payload);
  }

  @Delete(':commentId')
  markDeleted(
    @Param('commentId') commentId: string,
  ): Promise<Comment> {
    return this.commentsService.markDeleted(commentId);
  }
}


