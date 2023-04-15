import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRO } from './interfaces/comment.interface';
import { Comment } from './comment.decorator';

import {
  ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {

  constructor(private readonly commentService: CommentService) {}

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
  async getComment(@Comment('id') commentId: number, @Param('commentId') id: number): Promise<CommentRO> {
    return await this.commentService.findComment(commentId, id);
  }


  @ApiOperation({
    summary: 'Post a comment to the forum'
  })
  @ApiParam({ name: 'text', type: 'string' })
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
  @Post(':text/create')
  async create(@Comment('id') commentId: number, @Param('text') text: string): Promise<CommentRO> {
    return await this.commentService.createComment(commentId, text);
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
  @Delete(':commentId/delete')
  async delete(@Comment('id') commentId: number, @Param('commentId') id: number): Promise<CommentRO> {
    return await this.commentService.deleteComment(commentId, id);
  }

}