import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Polls } from './Polls.model';

export type OptionDocument = Options & Document;

@Schema({
  timestamps: true,
})
export class Options {
  @Prop({ required: true })
  optionText: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Polls' })
  pollId: Polls;

  @Prop({ required: true })
  contestant: string;

  @Prop({ type: Number, default: 0 })
  voteCount: number;
}

export const OptionModel = SchemaFactory.createForClass(Options);
