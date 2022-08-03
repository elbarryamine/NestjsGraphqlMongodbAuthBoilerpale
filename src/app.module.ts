import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { JwtModuleService } from './services/jwt.module';
import { ConfigModule } from './services/env.module';

const MONOGO_CONNECT_STRING = `mongodb+srv://${process.env.dbUserName}:${process.env.dbUserPassword}@cluster0.iig7z.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    MongooseModule.forRoot(MONOGO_CONNECT_STRING, { keepAlive: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      formatError(err) {
        err.extensions.exception['name'] = undefined;
        return {
          message: err.message,
          ...err.extensions.exception,
        };
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    JwtModuleService,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
