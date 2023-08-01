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
import { Accounts } from 'src/database/models/Accounts.model';
import { AuthUser } from 'src/decorators/auth';
import { APIResponse } from 'src/types/APIResponse';
import { CreatePollOptionsDto, UpdateOptionDto } from './dtos/CreateOptionDto';
import { GetSinglePollOptionDto } from './dtos/GetOptionDto';
import { OptionService } from './options.service';
import { GetSinglePollDto } from '../polls/dtos/GetPollDto';

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
  async createPollOptions(
    @AuthUser() user: Accounts,
    @Param() param: GetSinglePollDto,
    @Body() body: CreatePollOptionsDto,
  ): Promise<APIResponse<Array<Options>>> {
    const option = await this.optionService.createPollOptions(
      user,
      param,
      body,
    );

    return new APIResponse<Array<Options>>(option);
  }

  @ApiOperation({
    summary: 'Get Poll Options',
  })
  @Get(':id/option')
  async getPollOptions(
    @AuthUser() user: Accounts,
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
  async updatePollOptions(
    @Body() body: UpdateOptionDto,
    @Param() param: GetSinglePollOptionDto,
    @AuthUser() user: Accounts,
  ): Promise<APIResponse<Options>> {
    const option = await this.optionService.updatePollOptions(
      user,
      param,
      body,
    );

    return new APIResponse<Options>(option);
  }

  @ApiOperation({
    summary: 'Delete Single Poll Option',
  })
  @Delete(':id/option/:optionId')
  async deletePollOptions(
    @AuthUser() user: Accounts,
    @Param() param: GetSinglePollOptionDto,
  ): Promise<APIResponse<Options>> {
    const option = await this.optionService.deletePollOption(user, param);

    return new APIResponse<Options>(option);
  }
}
