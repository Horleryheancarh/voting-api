import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { TransformToLowercase } from 'src/decorators/transformers';

export class RegisterDto {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  postcode: string;

  @ApiProperty({
    required: true,
  })
  dateOfBirth: Date;

  @ApiProperty({
    required: true,
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    required: true,
    description: 'Should match password',
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    required: true,
    description: 'Unique username',
  })
  @IsDefined()
  @IsString()
  @TransformToLowercase()
  username: string;
}
