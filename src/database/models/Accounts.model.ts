import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Accounts & Document;

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({
  timestamps: true,
})
export class Accounts {
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({})
  state: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ default: Role.USER, enum: Role })
  role: Role;

  @Prop({ required: true })
  password: string;
}

export const AccountModel = SchemaFactory.createForClass(Accounts);
