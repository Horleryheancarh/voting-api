import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptionDocument, Options } from 'src/database/models/Options.model';
import { VoteDocument, Votes } from 'src/database/models/Votes.model';
import { CreateVoteDto } from './dtos/CreateVoteDto';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Votes.name)
    private readonly voteModel: Model<VoteDocument>,
    @InjectModel(Options.name)
    private readonly optionModel: Model<OptionDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async voteContestant(userId: string, data: CreateVoteDto) {
    await this.voteModel.create({ userId, ...data });

    const option = await this.optionModel
      .findByIdAndUpdate(data.optionId, {
        $inc: { voteCount: 1 },
      })
      .populate({ path: 'contestant', select: '-password' });

    this.eventEmitter.emit('newVote', option);
    return option;
  }
}
