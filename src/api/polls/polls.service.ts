import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptionDocument, Options } from 'src/database/models/Options.model';
import { PollDocument, Polls } from 'src/database/models/Polls.model';
import {
  AccountDocument,
  Accounts,
  Role,
} from 'src/database/models/Accounts.model';
import { CreatePollDto, CreatePollOptionsDto } from './dtos/CreatePollDto';
import { GetSinglePollDto } from './dtos/GetPollDto';

@Injectable()
export class PollService {
  constructor(
    @InjectModel(Polls.name)
    private readonly pollModel: Model<PollDocument>,
    @InjectModel(Options.name)
    private readonly optionModel: Model<OptionDocument>,
    @InjectModel(Accounts.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async createPoll(user: Accounts, data: CreatePollDto) {
    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException('Unauthorized Operation');

    const poll = await this.pollModel.create(data);

    return poll;
  }

  async createPollOptions(
    user: Accounts,
    pollId: GetSinglePollDto,
    option: CreatePollOptionsDto,
  ) {
    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException('Unauthorized Operation');

    if (!(await this.pollModel.findById(pollId.id)))
      throw new NotFoundException('Poll Not Found');

    const options = option.option.map(({ contestant, optionText }) => {
      return { pollId: pollId.id, contestant, optionText };
    });

    const polls = await this.optionModel.create(options);

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
      .populate({ path: 'option', select: '-password' });

    return { poll, options };
  }

  async editPoll(pollId: string, data: Partial<CreatePollDto>) {
    if (!(await this.pollModel.findById(pollId)))
      throw new NotFoundException('Poll Not Found');

    const poll = await this.pollModel.findByIdAndUpdate(pollId, data);

    return poll;
  }

  async deletePoll(pollId: string) {
    if (!(await this.pollModel.findById(pollId)))
      throw new NotFoundException('Poll Not Found');

    await this.pollModel.findByIdAndDelete(pollId);
  }

  async deletePollOption(pollId: string, optionId: string) {
    if (!(await this.optionModel.findOne({ pollId, optionId })))
      throw new NotFoundException('Poll Option Not Found');

    await this.optionModel.deleteOne({ pollId, optionId });
  }
}
