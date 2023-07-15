import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    required: true,
    description: "Email address for the account's password to reset",
  })
  @IsEmail()
  email: string;
}
