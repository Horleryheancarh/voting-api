import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsOptional,
  IsString,
  Length,
  IsMobilePhone,
  IsPostalCode,
} from 'class-validator';
import { TransformToLowercase } from 'src/decorators/transformers';

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(3)
  @TransformToLowercase()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2)
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2)
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsPostalCode('GB')
  postcode: string;

  @ApiProperty()
  @IsMobilePhone('en-GB')
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  dateOfBirth: Date;
}
