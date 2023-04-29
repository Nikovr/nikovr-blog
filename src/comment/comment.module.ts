import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaProvider } from '../prisma.providers';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaProvider],
  exports: [CommentService]
})
export class CommentModule { }