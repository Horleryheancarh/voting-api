import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsArray, ValidateNested } from 'class-validator';

export class OptionDto {
  @ApiProperty({
    required: true,
    description: 'Contestant UserId',
    example: '',
  })
  @IsMongoId()
  contestant: string;

  @ApiProperty({
    required: true,
    description: 'Party or Philosophy',
    example: '',
  })
  optionText: string;
}

export class CreatePollOptionsDto {
  @ApiProperty({
    required: true,
    description: 'Contestant details',
    type: OptionDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  option: OptionDto[];
}

export class UpdateOptionDto extends PartialType(OptionDto) {}
