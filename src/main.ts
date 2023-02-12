import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let port = process.env.PORT;
  if (port === undefined || isNaN(+port)) {
    port = '3000';
  }
  await app.listen(+port);
}
bootstrap();
