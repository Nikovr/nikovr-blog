import { Get, Post, Delete, Param, Controller, Body } from "@nestjs/common";
import { CommentService } from './comment.service';
import { Comment } from '@prisma/client'

import {
  ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/comment.dto';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {

  constructor(
    private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: 'Find a comment from the forum by id'
  })
  @ApiResponse({
    status: 200,
    description: 'Success: comment has been found'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found: comment has not been found'
  })
  @Get(':commentId')
  async getComment(@Param('commentId') id: string): Promise<Comment> {
    return await this.commentService.findComment(id);
  }

  @ApiOperation({
    summary: 'Find all comments from the forum'
  })
  @ApiResponse({
    status: 200,
    description: 'Success: comments have been found'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found: comments have not been found'
  })
  @Get('')
  async getComments(): Promise<Comment[]> {
    return await this.commentService.findComments();
  }


  @ApiOperation({
    summary: 'Post a comment to the forum'
  })
  @ApiResponse({
    status: 201,
    description: 'Success: comment has been posted to the forum.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: you do not have the rights to post a comment.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: you need to authorize to post a comment.'
  })
  @Post(':text')
  async create(@Body() data: CreateCommentDto): Promise<Comment> {
    return await this.commentService.createComment(data);
  }

  @ApiOperation({
    summary: 'Delete a comment by id'
  })
  @ApiResponse({
    status: 200,
    description: 'Success: comment has been deleted.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: you do not have the rights to delete this comment.'
  })

  @ApiResponse({
    status: 404,
    description: 'Not found: comment has not been found'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: you need to authorize to delete a comment.'
  })
  @Delete(':commentId')
  async delete(@Param('commentId') id: string) {
    await this.commentService.deleteComment(id);
  }

}