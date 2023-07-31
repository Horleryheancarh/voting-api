import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

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

export class UpdatePollDto extends PartialType(CreatePollDto) {}
