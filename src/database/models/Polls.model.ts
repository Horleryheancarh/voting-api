import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PollDocument = Polls & Document;

@Schema({
  timestamps: true,
})
export class Polls {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  stopAt: Date;
}

export const PollModel = SchemaFactory.createForClass(Polls);
