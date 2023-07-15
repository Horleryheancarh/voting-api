import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TransformToLowercase } from 'src/decorators/transformers';

export class UsernameDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  @TransformToLowercase()
  username: string;
}
