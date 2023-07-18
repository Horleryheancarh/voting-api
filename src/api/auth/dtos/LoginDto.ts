import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'johndoe',
    required: true,
    description: 'Email or Username',
    default: 'Email or Username',
  })
  @Length(3)
  identifier: string;

  @ApiProperty({
    example: 'P@ssw07d',
    required: true,
  })
  @IsString()
  password: string;
}
