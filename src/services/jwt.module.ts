import { JwtModule } from '@nestjs/jwt';
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from './env.module';

const _JwtModuleService = JwtModule.register({
  secret:
    'xvxXIpc9aC8ibZcoH4ZbVo/GGNOPLb/zxTdRxZBmaEx3JVSGppZ626ChdzynEWxuzjIWtnh4oXQ1DKuuJgOMDZYzy6qxeNWkQVCKo6hGX7Y',
  signOptions: { expiresIn: '3d' },
});

@Global()
@Module({
  imports: [ConfigModule, _JwtModuleService],
  exports: [_JwtModuleService],
})
export class JwtModuleService {}
