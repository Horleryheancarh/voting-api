import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class GetSinglePollOptionDto {
  @ApiProperty({
    required: true,
    description: 'Poll unique id',
    example: '',
  })
  @IsMongoId()
  id: string;

  @ApiProperty({
    required: true,
    description: 'Poll unique id',
    example: '',
  })
  @IsMongoId()
  optionId: string;
}
