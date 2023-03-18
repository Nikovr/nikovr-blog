import { Controller, Get, Render } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { TimeInterceptor } from './time.interceptor';

declare global {
  var loadTime: number;
}

@Controller()
@UseInterceptors(TimeInterceptor)
export class AppController {
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
  @Render('notes')
  getNotes() {
    return { serverLoadTime: globalThis.loadTime };
  }

  @Get('projects.html')
  @Render('projects')
  getProjects() {
    return { serverLoadTime: globalThis.loadTime };
  }
}
