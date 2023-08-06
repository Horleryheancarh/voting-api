import { Injectable, NotAcceptableException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptionDocument, Options } from 'src/database/models/Options.model';
import { VoteDocument, Votes } from 'src/database/models/Votes.model';
import { CreateVoteDto } from './dtos/CreateVoteDto';
import { Accounts } from 'src/database/models/Accounts.model';
import { GetSinglePollDto } from '../polls/dtos/GetPollDto';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Votes.name)
    private readonly voteModel: Model<VoteDocument>,
    @InjectModel(Options.name)
    private readonly optionModel: Model<OptionDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async voteContestant(user: Accounts, data: CreateVoteDto) {
    const { pollId, optionId } = data;

    if (await this.voteModel.findOne({ userId: user._id, pollId }))
      throw new NotAcceptableException('You already voted in this poll');

    await this.voteModel.create({ userId: user._id, ...data });

    const option = await this.optionModel
      .findOneAndUpdate(
        { pollId, _id: optionId },
        {
          $inc: { voteCount: 1 },
        },
        {
          new: true,
        },
      )
      .populate({ path: 'contestant', select: '-password' });

    const text = `${user.firstName} voted ${option.contestant.firstName}`;
    this.eventEmitter.emit('vote.new', text);
    return option;
  }

  async checkVote(userId: string, data: GetSinglePollDto) {
    if (await this.voteModel.findOne({ userId, pollId: data.id })) return true;

    return false;
  }
}
