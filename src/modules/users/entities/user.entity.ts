import {
  ObjectType,
  Field,
  GraphQLISODateTime,
  OmitType,
} from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ name: 'id' })
  _id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => GraphQLISODateTime)
  joinedAt: Date;
}

@ObjectType()
export class UserSignin {
  @Field(() => UserSign)
  user: UserSignType;

  @Field(() => String)
  token: string;
}

@ObjectType()
class UserSign extends OmitType(User, ['password']) {}
type UserSignType = Omit<User, 'password'>;
