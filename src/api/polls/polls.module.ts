import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OptionModel, Options } from 'src/database/models/Options.model';
import { AccountModel, Accounts } from 'src/database/models/Accounts.model';
import { PollModel, Polls } from 'src/database/models/Polls.model';
import { PollController } from './polls.controller';
import { PollService } from './polls.service';

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
        name: Accounts.name,
        schema: AccountModel,
      },
    ]),
  ],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
