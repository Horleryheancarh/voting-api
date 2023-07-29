import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Polls } from './Polls.model';
import { Accounts } from './Accounts.model';

export type OptionDocument = Options & Document;

@Schema({
  timestamps: true,
})
export class Options {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Polls',
  })
  pollId: Polls;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accounts',
  })
  option: Accounts;
}

export const OptionModel = SchemaFactory.createForClass(Polls);
