import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Polls } from './Polls.model';
import { Accounts } from './Accounts.model';

export type OptionDocument = Options & Document;

@Schema({
  timestamps: true,
})
export class Options {
  @Prop({ type: String })
  optionText: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Polls' })
  pollId: Polls;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Accounts' })
  contestant: Accounts;

  @Prop({ type: Number, default: 0 })
  voteCount: number;
}

export const OptionModel = SchemaFactory.createForClass(Options);
