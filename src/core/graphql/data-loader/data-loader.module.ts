import { Module } from '@nestjs/common';
import { DataLoaderService } from '@core/graphql/data-loader/data-loader.service';
import { UserByIdLoader } from '@core/graphql/data-loader/user-loaders/user-by-id.loader';
import { BetsByUserIdLoader } from '@core/graphql/data-loader/bet-loaders/bets-by-user-id.loader';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '@api/user/models/user.model';
import { BetModel } from '@api/bet/models/bet.model';

const LOADERS = [UserByIdLoader, BetsByUserIdLoader];

@Module({
  imports: [SequelizeModule.forFeature([UserModel, BetModel])],
  providers: [DataLoaderService, ...LOADERS],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
