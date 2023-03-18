import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { isLoggedIn: true, username: 'nikovr' };
  }

  @Get('index.html')
  @Render('index')
  getIndex() {
    return { isLoggedIn: false, username: 'nikovr' };
  }

  @Get('gallery.html')
  @Render('gallery')
  getGallery() {
    return { };
  }

  @Get('notes.html')
  @Render('notes')
  getNotes() {
    return { };
  }

  @Get('projects.html')
  @Render('projects')
  getProjects() {
    return { };
  }
}
