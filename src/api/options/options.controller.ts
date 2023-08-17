import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Options } from 'src/database/models/Options.model';
import { APIResponse } from 'src/types/APIResponse';
import { CreatePollOptionsDto, UpdateOptionDto } from './dtos/CreateOptionDto';
import { GetSinglePollOptionDto } from './dtos/GetOptionDto';
import { OptionService } from './options.service';
import { GetSinglePollDto } from '../polls/dtos/GetPollDto';
import { RequiresAdminRole } from 'src/decorators/auth';

@ApiBadRequestResponse({
  description: 'Bad request Response',
  type: BadRequestException,
})
@ApiUnauthorizedResponse({
  description: 'Unathorized',
  type: UnauthorizedException,
})
@Controller('options')
@ApiTags('Options')
@ApiBearerAuth()
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @ApiOperation({
    summary: 'Add Poll Options',
  })
  @Post(':id/option')
  @RequiresAdminRole()
  async createPollOptions(
    @Param() param: GetSinglePollDto,
    @Body() body: CreatePollOptionsDto,
  ): Promise<APIResponse<Array<Options>>> {
    const option = await this.optionService.createPollOptions(param, body);

    return new APIResponse<Array<Options>>(option);
  }

  @ApiOperation({
    summary: 'Get Poll Options',
  })
  @Get(':id/option')
  async getPollOptions(
    @Param() param: GetSinglePollDto,
  ): Promise<APIResponse<Array<Options>>> {
    const options = await this.optionService.getPollOptions(param);

    return new APIResponse<Array<Options>>(options);
  }

  @ApiOperation({
    summary: 'Get Single Poll Options',
  })
  @Get(':id/option/:optionId')
  async getSinglePollOptions(
    @Param() param: GetSinglePollOptionDto,
  ): Promise<APIResponse<Options>> {
    const option = await this.optionService.getSinglePollOption(param);

    return new APIResponse<Options>(option);
  }

  @ApiOperation({
    summary: 'Edit Poll Options',
  })
  @Put(':id/option/:optionId')
  @RequiresAdminRole()
  async updatePollOptions(
    @Body() body: UpdateOptionDto,
    @Param() param: GetSinglePollOptionDto,
  ): Promise<APIResponse<Options>> {
    const option = await this.optionService.updatePollOptions(param, body);

    return new APIResponse<Options>(option);
  }

  @ApiOperation({
    summary: 'Delete Single Poll Option',
  })
  @Delete(':id/option/:optionId')
  @RequiresAdminRole()
  async deletePollOptions(
    @Param() param: GetSinglePollOptionDto,
  ): Promise<APIResponse<Options>> {
    const option = await this.optionService.deletePollOption(param);

    return new APIResponse<Options>(option);
  }
}
