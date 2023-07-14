import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    description: 'Email or Username',
    default: 'Email or Username',
  })
  @Length(3)
  identifier: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  password: string;
}
