import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsMongoId, IsString } from 'class-validator';

// Poll validation DTO
export class CreatePollDto {
  @ApiProperty({
    required: true,
    description: 'Title of Poll',
    example: 'Presidential 2023',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    description: 'When to open poll',
    example: '2023-07-18T12:37:16.504+00:00',
  })
  @IsDateString()
  startAt: Date;

  @ApiProperty({
    required: true,
    description: 'When to close poll',
    example: '2023-07-18T12:37:16.504+00:00',
  })
  @IsDateString()
  stopAt: Date;
}

export class CreatePollOptionsDto {
  @ApiProperty({
    required: true,
    description: 'Poll Id',
  })
  @IsMongoId()
  pollId: string;

  @ApiProperty({
    required: true,
    description: 'Contestant UserId',
  })
  @IsArray()
  @IsMongoId()
  option: Array<string>;
}
