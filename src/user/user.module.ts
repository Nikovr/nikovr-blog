import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaProvider } from '../prisma.providers';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaProvider],
  exports: [UserService],
})
export class UserModule { }