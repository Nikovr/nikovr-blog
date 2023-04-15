import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserRO } from './interfaces/user.interface';
@Injectable()
export class UserService {
  async findUser(id: number, username: string):
    Promise<UserRO> {
    throw new NotImplementedException();
  }

  async createUser(id: number, username: string):
    Promise<UserRO> {
    throw new NotImplementedException();
  }

  async deleteUser(id: number, username: number):
    Promise<UserRO> {
    throw new NotImplementedException();
  }
}