import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Tokens & Document;

export enum ITokenPurpose {
  RESET_PASSWORD = 'reset_password',
  EMAIL_CONFIRMATION = 'email_confirmation',
}

@Schema({
  timestamps: true,
})
export class Tokens {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: 'reset_password' })
  purpose: ITokenPurpose;
}

export const TokenModel = SchemaFactory.createForClass(Tokens);
