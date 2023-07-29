import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PollService } from './polls.service';
import { AuthUser } from 'src/decorators/auth';
import { Accounts } from 'src/database/models/Accounts.model';
import { CreatePollDto } from './dtos/CreatePollDto';
import { Polls } from 'src/database/models/Polls.model';
import { APIResponse } from 'src/types/APIResponse';
import { GetSinglePollDto } from './dtos/GetPollDto';

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
    summary: 'Get all Polls',
  })
  @Get('')
  async getPolls(
    @Query() query: Partial<CreatePollDto>,
  ): Promise<APIResponse<Array<Polls>>> {
    const polls = await this.pollService.getPolls(query);

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
