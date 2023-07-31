import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteModel, Votes } from 'src/database/models/Votes.model';
import { OptionModel, Options } from 'src/database/models/Options.model';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Votes.name,
        schema: VoteModel,
      },
      {
        name: Options.name,
        schema: OptionModel,
      },
    ]),
  ],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
