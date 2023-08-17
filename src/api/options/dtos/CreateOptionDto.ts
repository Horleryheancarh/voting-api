import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsString } from 'class-validator';

export class OptionDto {
  @ApiProperty({
    required: true,
    description: 'Contestant Name',
    example: '',
  })
  @IsString()
  contestant: string;

  @ApiProperty({
    required: true,
    description: 'Party or Philosophy',
    example: '',
  })
  @IsString()
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
