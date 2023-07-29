import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
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
import { CreatePollDto, CreatePollOptionsDto } from './dtos/CreatePollDto';
import { Polls } from 'src/database/models/Polls.model';
import { APIResponse } from 'src/types/APIResponse';
import { GetSinglePollDto } from './dtos/GetPollDto';

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
  constructor(private readonly pollService: PollService) {}

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
    summary: 'Add Poll Options',
  })
  @Post(':id')
  async createPollOptions(
    @AuthUser() user: Accounts,
    @Param() param: GetSinglePollDto,
    @Body() body: CreatePollOptionsDto,
  ): Promise<APIResponse<object>> {
    const poll = await this.pollService.createPollOptions(user, param, body);

    return new APIResponse<object>(poll);
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
}
