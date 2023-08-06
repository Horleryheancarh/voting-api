import { Controller, Param, Patch } from '@nestjs/common';
import { VoteService } from './vote.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Options } from 'src/database/models/Options.model';
import { Accounts } from 'src/database/models/Accounts.model';
import { AuthUser } from 'src/decorators/auth';
import { APIResponse } from 'src/types/APIResponse';
import { CreateVoteDto } from './dtos/CreateVoteDto';

@Controller('vote')
@ApiTags('Vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @ApiOperation({
    summary: 'Vote Your candidate',
  })
  @Patch(':pollId/vote/:optionId')
  async vote(
    @AuthUser() user: Accounts,
    @Param() param: CreateVoteDto,
  ): Promise<APIResponse<Options>> {
    const vote = await this.voteService.voteContestant(user, param);

    return new APIResponse<Options>(vote);
  }
}
