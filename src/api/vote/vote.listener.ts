import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Options } from 'src/database/models/Options.model';

@Injectable()
export class VoteListener {
  @OnEvent('vote.new')
  async handleNewVote(data: Options) {
    console.log(data);
  }
}
