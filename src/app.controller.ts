import { Body, Controller, Get, Post, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { TimeInterceptor } from './time.interceptor';
import { CommentService } from './comment/comment.service';
import { UserService } from "./user/user.service";
import { CreateCommentDto } from "./comment/dto/comment.dto";


declare global {
  var loadTime: number;
}

@Controller()
@UseInterceptors(TimeInterceptor)
export class AppController {
  constructor(private commentService: CommentService, private userService: UserService) {}
  @Get()
  @Render('index')
  root() {
    return { isLoggedIn: true, username: 'nikovr', serverLoadTime: globalThis.loadTime };
  }

  @Get('index.html')
  @Render('index')
  getIndex() {
    return { isLoggedIn: false, username: 'nikovr', serverLoadTime: globalThis.loadTime };
  }

  @Get('gallery.html')
  @Render('gallery')
  getGallery() {
    return { serverLoadTime: globalThis.loadTime };
  }

  @Get('notes.html')
  async getNotes(@Res() res: Response) {
    const comments = await this.commentService.findComments()
    const commentsWithAuthor = await Promise.all(comments.map(async (comment) => {
      const author = await this.userService.findUser(String(comment.authorId));
      return { ...comment, authorName: author.username };
    }),);
    const reversedComments = commentsWithAuthor.reverse()
    return res.render('notes', { comments: reversedComments ,serverLoadTime: globalThis.loadTime } );
  }

  @Post('/comments')
  async createComment(@Body('sumbitted') text: string, @Res() res: Response) {
    this.commentService.createComment({ content: text, authorId: 1 });
    res.redirect('/notes.html')
  }
  @Get('projects.html')
  @Render('projects')
  getProjects() {
    return { serverLoadTime: globalThis.loadTime };
  }
}
