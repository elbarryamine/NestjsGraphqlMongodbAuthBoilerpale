import { Module, Global } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';

const EnvModule = _ConfigModule.forRoot();
@Global()
@Module({
  imports: [EnvModule],
  exports: [EnvModule],
})
export class ConfigModule {}
