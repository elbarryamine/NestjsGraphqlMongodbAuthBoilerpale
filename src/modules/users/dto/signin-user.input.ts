import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUserInput {
  @Field(() => String)
  identifier: string;

  @Field(() => String)
  password: string;
}
