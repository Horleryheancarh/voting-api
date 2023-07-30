import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PollService } from './polls.service';
import { AuthUser } from 'src/decorators/auth';
import { Accounts } from 'src/database/models/Accounts.model';
import {
  CreatePollDto,
  CreatePollOptionsDto,
  OptionDto,
} from './dtos/CreatePollDto';
import { Polls } from 'src/database/models/Polls.model';
import { APIResponse } from 'src/types/APIResponse';
import { GetSinglePollDto, GetSinglePollOptionDto } from './dtos/GetPollDto';
import { Options } from 'src/database/models/Options.model';
import { OptionService } from './options.service';

@ApiBadRequestResponse({
  description: 'Bad request Response',
  type: BadRequestException,
})
@ApiUnauthorizedResponse({
  description: 'Unathorized',
  type: UnauthorizedException,
})
@Controller('polls')
@ApiTags('Poll')
@ApiBearerAuth()
export class PollController {
  constructor(
    private readonly pollService: PollService,
    private readonly optionService: OptionService,
  ) {}

  @ApiOperation({
    summary: 'Create New Poll',
  })
  @Post('')
  async createPoll(
    @AuthUser() user: Accounts,
    @Body() body: CreatePollDto,
  ): Promise<APIResponse<Polls>> {
    const poll = await this.pollService.createPoll(user, body);

    return new APIResponse<Polls>(poll);
  }

  @ApiOperation({
    summary: 'Update Poll',
  })
  @Put(':id')
  async updatePoll(
    @AuthUser() user: Accounts,
    @Param() param: GetSinglePollDto,
    @Body() body: Partial<CreatePollDto>,
  ): Promise<APIResponse<Polls>> {
    const poll = await this.pollService.editPoll(user, param.id, body);

    return new APIResponse<Polls>(poll);
  }

  @ApiOperation({
    summary: 'Get active Polls',
  })
  @Get('/active')
  async getActivePolls(
    @Query() query: Partial<CreatePollDto>,
  ): Promise<APIResponse<Array<Polls>>> {
    const polls = await this.pollService.getActivePolls(query);

    return new APIResponse<Array<Polls>>(polls);
  }

  @ApiOperation({
    summary: 'Get Upcoming Polls',
  })
  @Get('/upcoming')
  async getUpcomingolls(
    @Query() query: Partial<CreatePollDto>,
  ): Promise<APIResponse<Array<Polls>>> {
    const polls = await this.pollService.getUpcomingPolls(query);

    return new APIResponse<Array<Polls>>(polls);
  }

  @ApiOperation({
    summary: 'Get single poll and its options',
  })
  @Get(':id')
  async getSinglePoll(
    @Param() param: GetSinglePollDto,
  ): Promise<APIResponse<object>> {
    const poll = await this.pollService.getSinglePoll(param.id);

    return new APIResponse<object>(poll);
  }

  @ApiOperation({
    summary: 'Get single poll and its options',
  })
  @Delete(':id')
  async deleteSinglePoll(
    @AuthUser() user: Accounts,
    @Param() param: GetSinglePollDto,
  ): Promise<APIResponse<string>> {
    await this.pollService.deletePoll(user, param.id);

    return new APIResponse<string>('Poll deleted');
  }

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
    @AuthUser() user: Accounts,
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
    @AuthUser() user: Accounts,
    @Param() param: GetSinglePollOptionDto,
    @Body() body: Partial<OptionDto>,
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
    const poll = await this.optionService.deletePollOption(user, param);

    return new APIResponse<Options>(poll);
  }
}
