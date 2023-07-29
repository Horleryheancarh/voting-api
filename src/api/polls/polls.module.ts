import { MongooseModule } from '@nestjs/mongoose';
import { PollModel, Polls } from 'src/database/models/Polls.model';
import { PollController } from './polls.controller';
import { PollService } from './polls.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Polls.name,
        schema: PollModel,
      },
    ]),
  ],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
