import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'express-handlebars';
import { join } from 'path';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from "@nestjs/swagger";
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))

  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'views', 'layouts'),
      partialsDir: join(__dirname, '..', 'views', 'partials'),
    }),
  );

  app.setViewEngine('hbs')

  const config = new DocumentBuilder()
    .setTitle('Personal Blog API')
    .setDescription('documentation for API used in this project')
    .setVersion('1.0')
    .addTag('nikovr')
    .build();

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey,
    include: [UserModule, CommentModule],
  };


  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  let port = process.env.PORT;
  if (port === undefined || isNaN(+port)) {
    port = '3000';
  }
  await app.listen(+port);
}
bootstrap();
