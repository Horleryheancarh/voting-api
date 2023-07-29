import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Polls } from './Polls.model';
import { Options } from './Options.model';
import { Accounts } from './Accounts.model';

export type VoteDocument = Votes & Document;

@Schema({
  timestamps: true,
})
export class Votes {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Polls',
  })
  pollId: Polls;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Options',
  })
  optionId: Options;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accounts',
  })
  userId: Accounts;
}

export const VoteModel = SchemaFactory.createForClass(Votes);
