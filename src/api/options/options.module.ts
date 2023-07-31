import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionModel, Options } from 'src/database/models/Options.model';
import { PollModel, Polls } from 'src/database/models/Polls.model';
import { OptionController } from './options.controller';
import { OptionService } from './options.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Options.name,
        schema: OptionModel,
      },
      {
        name: Polls.name,
        schema: PollModel,
      },
    ]),
  ],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
