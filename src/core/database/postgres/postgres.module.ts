import { Module } from '@nestjs/common';
import { SequelizeConfigFactory } from './sequelize-config.factory';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forRootAsync({ useClass: SequelizeConfigFactory })],
})
export class PostgresModule {}
