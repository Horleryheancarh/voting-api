import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OptionModel, Options } from 'src/database/models/Options.model';
import { AccountModel, Accounts } from 'src/database/models/Accounts.model';
import { PollModel, Polls } from 'src/database/models/Polls.model';
import { VoteModel, Votes } from 'src/database/models/Votes.model';
import { PollController } from './polls.controller';
import { PollService } from './polls.service';
import { OptionService } from '../options/options.service';
import { VoteService } from '../options/vote.service';
import { VoteListener } from '../options/vote.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Polls.name,
        schema: PollModel,
      },
      {
        name: Options.name,
        schema: OptionModel,
      },
      {
        name: Votes.name,
        schema: VoteModel,
      },
      {
        name: Accounts.name,
        schema: AccountModel,
      },
    ]),
  ],
  controllers: [PollController],
  providers: [PollService, OptionService, VoteService, VoteListener],
})
export class PollModule {}
