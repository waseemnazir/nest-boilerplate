import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  // Validate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserType } from '../entities/users.enums';
// import { IsNotExist } from '../../utils/validators/is-not-exists.validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  // @Validate(IsNotExist, ['Users'], {
  //   message: 'Email already exists!',
  // })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  password?: string;

  @ApiProperty({ enum: UserType, example: UserType.STAFF })
  @IsEnum(UserType)
  @IsOptional()
  userType: UserType;
}
