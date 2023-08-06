import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { TransformToLowercase } from 'src/decorators/transformers';

export class RegisterDto {
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'Users email address',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'Users Firstname',
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Users lastname',
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '111101',
    description: 'Users post code',
  })
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty({
    example: '1010-10-10',
    description: 'Users date of birth',
    required: true,
  })
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({
    example: 'P@ssw07d',
    description: 'Users password',
    required: true,
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'P@ssw07d',
    required: true,
    description: 'Should match password',
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    example: 'johndoe',
    required: true,
    description: 'Unique username',
  })
  @IsString()
  @TransformToLowercase()
  username: string;
}
