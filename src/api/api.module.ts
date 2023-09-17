import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BetModule } from './bet/bet.module';

const CHILD_MODULES = [UserModule, BetModule];

@Module({
  imports: [...CHILD_MODULES],
})
export class ApiModule {}
