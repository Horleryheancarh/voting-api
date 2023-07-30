import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty({
    required: true,
    description: 'Poll Id',
  })
  @IsMongoId()
  pollId: string;

  @ApiProperty({
    required: true,
    description: 'Poll Id',
  })
  @IsMongoId()
  optionId: string;
}
