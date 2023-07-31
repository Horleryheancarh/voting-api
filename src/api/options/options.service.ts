import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accounts, Role } from 'src/database/models/Accounts.model';
import { OptionDocument, Options } from 'src/database/models/Options.model';
import { PollDocument, Polls } from 'src/database/models/Polls.model';
import { CreatePollOptionsDto, OptionDto } from './dtos/CreateOptionDto';
import { GetSinglePollOptionDto } from './dtos/GetOptionDto';
import { GetSinglePollDto } from '../polls/dtos/GetPollDto';

@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Polls.name)
    private readonly pollModel: Model<PollDocument>,
    @InjectModel(Options.name)
    private readonly optionModel: Model<OptionDocument>,
  ) {}

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

    for (const m of options) {
      if (await this.optionModel.findOne(m))
        throw new NotAcceptableException(
          `${m.contestant} already running for a post`,
        );
    }

    const polls = await this.optionModel.create(options);

    return polls;
  }

  async getPollOptions(param: GetSinglePollDto) {
    const options = await this.optionModel
      .find({ pollId: param.id })
      .populate({ path: 'contestant', select: '-password' });

    if (options.length === 0)
      throw new NotFoundException('No Contestant Found for the Poll');

    return options;
  }

  async getSinglePollOption(param: GetSinglePollOptionDto) {
    const option = await this.optionModel
      .findById(param.optionId)
      .populate({ path: 'contestant', select: '-password' });

    if (!option) throw new NotFoundException('Contestant not Found');

    return option;
  }

  async updatePollOptions(
    user: Accounts,
    param: GetSinglePollOptionDto,
    option: Partial<OptionDto>,
  ) {
    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException('Unauthorized Operation');

    const { optionId } = param;
    const pollOption = await this.optionModel.findByIdAndUpdate(
      optionId,
      option,
      {
        new: true,
      },
    );

    if (!pollOption) throw new NotFoundException('Poll Contestant Not Found');

    return pollOption;
  }

  async deletePollOption(user: Accounts, param: GetSinglePollOptionDto) {
    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException('Unauthorized Operation');

    const { optionId } = param;

    if (!(await this.optionModel.findById(optionId)))
      throw new NotFoundException('Poll Option Not Found');

    const pollOption = await this.optionModel.findByIdAndDelete(optionId);

    return pollOption;
  }
}
