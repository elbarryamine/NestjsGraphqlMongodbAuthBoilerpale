import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaType } from './entities/user.schema';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaType.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersResolver],
})
export class UsersModule {}
