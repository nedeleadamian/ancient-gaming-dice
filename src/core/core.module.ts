import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GqlModule } from './graphql/graphql.module';
import { DataLoaderModule } from '@core/graphql/data-loader/data-loader.module';

const MODULES = [DatabaseModule, ConfigModule, GqlModule];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class CoreModule {}
