import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}
  async findUser(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id: parseInt(id) }
    });}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id: parseInt(id) } });
  }
}