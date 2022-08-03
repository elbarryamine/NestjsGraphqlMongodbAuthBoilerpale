import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class UserSchemaType {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  joinedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaType);
export type UserDocument = UserSchemaType & Document;
