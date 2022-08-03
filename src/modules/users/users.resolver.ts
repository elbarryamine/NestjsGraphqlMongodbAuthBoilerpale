import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserSignin } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserSchemaType } from './entities/user.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { SignUserInput } from './dto/signin-user.input';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @InjectModel(UserSchemaType.name) private UserModule: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => User)
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      const { password, passwordConfirm, email, username } = createUserInput;
      // check if password & passconfirm match
      if (password !== passwordConfirm) {
        throw new HttpException(
          { message: 'password does not match passwordConfirm' },
          400,
        );
      }

      // check if email being used

      const userHasSameEmail = await this.UserModule.findOne({ email });
      if (userHasSameEmail) {
        throw new HttpException(
          { message: 'email is assigned with another accound' },
          400,
        );
      }

      // check if username being used
      const userHasSameUsername = await this.UserModule.findOne({ username });
      if (userHasSameUsername) {
        throw new HttpException(
          { message: 'username is assigned with another accound' },
          400,
        );
      }

      // should hash password
      const hashedPass = await hash(password, 10);

      return await this.UserModule.create({
        email,
        password: hashedPass,
        username,
      });
    } catch (error) {
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  @Query(() => UserSignin)
  async signIn(@Args('signUserInput') signUserInput: SignUserInput) {
    try {
      const { identifier, password } = signUserInput;
      // get user by email or username
      const user = await this.UserModule.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      // check if user and password match

      if (!user) {
        throw new HttpException(
          { message: 'wrong email/username & password' },
          400,
        );
      }
      console.log(password, user.password);
      const match = await compare(password, user.password);
      if (!match) {
        throw new HttpException(
          { message: 'wrong email/username & password' },
          400,
        );
      }
      // send user and token
      return {
        user,
        token: this.jwtService.sign({ id: user.id }),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }
}
