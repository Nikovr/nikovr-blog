import { Get, Post, Delete, Param, Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client'

import {
  ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';

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
  @Get(':userId')
  async getUser(@Param('userId') id: string): Promise<User> {
    return await this.userService.findUser(id);
  }

  @ApiOperation({
    summary: 'Create a user'
  })
  @ApiResponse({
    status: 201,
    description: 'Success: user has been created.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: you do not have the rights to create users.'
  })
  @Post(':username')
  async create(@Body() data: CreateUserDto): Promise<User> {
    return await this.userService.createUser(data);
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
  @Delete(':userId')
  async delete(@Param('userId') id: string) {
    return await this.userService.deleteUser(id);
  }

}