import { Injectable, NotImplementedException } from '@nestjs/common';
import { CommentRO } from './interfaces/comment.interface';
@Injectable()
export class CommentService {
  async findComment(id: number, username: number):
    Promise<CommentRO> {
    throw new NotImplementedException();
  }

  async createComment(id: number, username: string):
    Promise<CommentRO> {
    throw new NotImplementedException();
  }

  async deleteComment(id: number, username: number):
    Promise<CommentRO> {
    throw new NotImplementedException();
  }
}