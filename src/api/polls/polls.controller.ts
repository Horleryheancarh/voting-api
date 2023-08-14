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
import { CreatePollDto, UpdatePollDto } from './dtos/CreatePollDto';
import { Polls } from 'src/database/models/Polls.model';
import { APIResponse } from 'src/types/APIResponse';
import { GetSinglePollDto } from './dtos/GetPollDto';
import { AuthUser, RequiresAdminRole } from 'src/decorators/auth';
import { Accounts } from 'src/database/models/Accounts.model';

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
  @Post()
  // @RequiresAdminRole()
  async createPoll(
    @AuthUser() user: Accounts,
    @Body() body: CreatePollDto,
  ): Promise<APIResponse<Polls>> {
    console.log(user);
    const poll = await this.pollService.createPoll(body);

    return new APIResponse<Polls>(poll);
  }

  @ApiOperation({
    summary: 'Get all Polls',
  })
  @Get('/')
  async getAllPolls(
    @Query() query: UpdatePollDto,
  ): Promise<APIResponse<Array<Polls>>> {
    const polls = await this.pollService.getAllPolls(query);

    return new APIResponse<Array<Polls>>(polls);
  }

  @ApiOperation({
    summary: 'Update Poll',
  })
  @Put(':id')
  // @RequiresAdminRole()
  async updatePoll(
    @Param() param: GetSinglePollDto,
    @Body() body: UpdatePollDto,
  ): Promise<APIResponse<Polls>> {
    const poll = await this.pollService.editPoll(param.id, body);

    return new APIResponse<Polls>(poll);
  }

  @ApiOperation({
    summary: 'Get active Polls',
  })
  @Get('/active')
  async getActivePolls(
    @Query() query: UpdatePollDto,
  ): Promise<APIResponse<Array<Polls>>> {
    const polls = await this.pollService.getActivePolls(query);

    return new APIResponse<Array<Polls>>(polls);
  }

  @ApiOperation({
    summary: 'Get Upcoming Polls',
  })
  @Get('/upcoming')
  async getUpcomingolls(
    @Query() query: UpdatePollDto,
  ): Promise<APIResponse<Array<Polls>>> {
    const polls = await this.pollService.getUpcomingPolls(query);

    return new APIResponse<Array<Polls>>(polls);
  }

  @ApiOperation({
    summary: 'Get single poll and its options',
  })
  @Get(':id')
  // @RequiresAdminRole()
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
  // @RequiresAdminRole()
  async deleteSinglePoll(
    @Param() param: GetSinglePollDto,
  ): Promise<APIResponse<string>> {
    await this.pollService.deletePoll(param.id);

    return new APIResponse<string>('Poll deleted');
  }
}
