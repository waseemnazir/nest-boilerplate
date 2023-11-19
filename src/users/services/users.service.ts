import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractApiResponse } from '../../utils/general-response';

import { Users } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create<T>(
    createUserDto: CreateUserDTO,
  ): Promise<AbstractApiResponse<T>> {
    try {
      const { firstName, lastName, email, password, userType } = createUserDto;

      const existingUser = await this.usersRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      const user = new Users();

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.userType = userType;
      user.createdAt = Math.floor(new Date().getTime() / 1000);
      user.updatedAt = Math.floor(new Date().getTime() / 1000);
      const savedUser = await this.usersRepository.save(user);

      return AbstractApiResponse.success<T>(
        savedUser as T,
        'User created successfully!',
        201,
      );
    } catch (error) {
      if (error) {
        throw error;
      }
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
