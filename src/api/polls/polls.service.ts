import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptionDocument, Options } from 'src/database/models/Options.model';
import { PollDocument, Polls } from 'src/database/models/Polls.model';
import { CreatePollDto } from './dtos/CreatePollDto';

@Injectable()
export class PollService {
  constructor(
    @InjectModel(Polls.name)
    private readonly pollModel: Model<PollDocument>,
    @InjectModel(Options.name)
    private readonly optionModel: Model<OptionDocument>,
  ) {}

  async createPoll(data: CreatePollDto) {
    const poll = await this.pollModel.create(data);

    return poll;
  }

  async getAllPolls(query: Partial<CreatePollDto>) {
    const polls = await this.pollModel.find({ ...query });

    if (polls.length === 0) throw new NotFoundException('No Polls Found');

    return polls;
  }

  async getActivePolls(query: Partial<CreatePollDto>) {
    const now = new Date();
    const polls = await this.pollModel.find({
      ...query,
      startAt: { $lt: now },
      stopAt: { $gt: now },
    });
    if (polls.length === 0) throw new NotFoundException('No Polls Found');

    return polls;
  }

  async getUpcomingPolls(query: Partial<CreatePollDto>) {
    const now = new Date();
    const polls = await this.pollModel.find({
      ...query,
      startAt: { $gt: now },
    });
    if (polls.length === 0) throw new NotFoundException('No Polls Found');

    return polls;
  }

  async getSinglePoll(pollId: string) {
    const poll = await this.pollModel.findById(pollId);

    if (!poll) throw new NotFoundException('Poll Not Found');

    const options = await this.optionModel
      .find({ pollId })
      .populate({ path: 'contestant', select: '-password' });

    return { poll, options };
  }

  async editPoll(pollId: string, data: Partial<CreatePollDto>) {
    if (!(await this.pollModel.findById(pollId)))
      throw new NotFoundException('Poll Not Found');

    const poll = await this.pollModel.findByIdAndUpdate(pollId, data, {
      new: true,
    });

    return poll;
  }

  async deletePoll(pollId: string) {
    if (!(await this.pollModel.findById(pollId)))
      throw new NotFoundException('Poll Not Found');

    await this.pollModel.findByIdAndDelete(pollId);
  }
}
