import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Comment } from '@prisma/client';
import { CreateCommentDto} from './dto/comment.dto';
@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaClient) {}
  async findComment(id: string): Promise<Comment> {
    return this.prisma.comment.findFirst({
      where: { id: parseInt(id) }
    });}
  async findComments(): Promise<Comment[]> {
    return this.prisma.comment.findMany();
  }

  async createComment(data: CreateCommentDto): Promise<Comment> {
    data.authorId = 1; // no authorization so always anon
    return this.prisma.comment.create({ data });
  }

  async deleteComment(id: string){
    await this.prisma.comment.delete({ where: { id: parseInt(id) } });
  }
}