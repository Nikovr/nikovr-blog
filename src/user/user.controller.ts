import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRO } from './interfaces/user.interface';
import { User } from './user.decorator';

import {
  ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Find a user by username'
  })
  @ApiResponse({
    status: 200,
    description: 'Success: user has been found'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found: user has not been found'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: you do not have the rights to search for users.'
  })
  @Get(':username')
  async getUser(@User('id') userId: number, @Param('username') username: string): Promise<UserRO> {
    return await this.userService.findUser(userId, username);
  }

  @ApiOperation({
    summary: 'Create a user'
  })
  @ApiParam({ name: 'username', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'Success: user has been created.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: you do not have the rights to create users.'
  })
  @Post(':username/create')
  async create(@User('id') userId: number, @Param('username') username: string): Promise<UserRO> {
    return await this.userService.createUser(userId, username);
  }


  @ApiOperation({
    summary: 'Delete a user by id'
  })
  @ApiResponse({
    status: 200,
    description: 'Success: user has been deleted'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found: user has not been found'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: you do not have the rights to delete users.'
  })
  @Delete(':userId/delete')
  async delete(@User('id') userId: number,  @Param('userId') id: number): Promise<UserRO> {
    return await this.userService.deleteUser(userId, id);
  }

}