import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AbstractApiResponse } from '../../utils/general-response';
import { CreateUserDTO } from '../dto/create-user.dto';

import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register<T>(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<AbstractApiResponse<T>> {
    try {
      const response: AbstractApiResponse<T> =
        await this.userService.create<T>(createUserDto);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
