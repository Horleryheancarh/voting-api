import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    required: true,
    description: "Email address for the account's password to reset",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'The token to validate the request',
  })
  @IsString()
  token: string;

  @ApiProperty({
    required: true,
    description: 'The new password',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  confirmPassword: string;
}
