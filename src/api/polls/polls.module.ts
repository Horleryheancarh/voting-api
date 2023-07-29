import { MongooseModule } from '@nestjs/mongoose';
import { PollModel, Polls } from 'src/database/models/Polls.model';
import { PollController } from './polls.controller';
import { PollService } from './polls.service';
import { Module } from '@nestjs/common';
import { OptionModel, Options } from 'src/database/models/Options.model';

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
    ]),
  ],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
