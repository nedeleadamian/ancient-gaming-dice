import { Injectable } from '@nestjs/common';
import { IDataLoaders } from './data-loader.interface';
import { BetsByUserIdLoader } from '@core/graphql/data-loader/bet-loaders/bets-by-user-id.loader';
import { UserByIdLoader } from '@core/graphql/data-loader/user-loaders/user-by-id.loader';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly betsByUserIdLoader: BetsByUserIdLoader,
    private readonly userByIdLoader: UserByIdLoader,
  ) {}

  getLoaders(): IDataLoaders {
    return {
      betsByUserIdLoader: this.betsByUserIdLoader.batchLoadFunction,
      userByIdLoader: this.userByIdLoader.batchLoadFunction,
    };
  }
}
