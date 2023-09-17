import DataLoader from 'dataloader';
import { BetModel } from '@api/bet/models/bet.model';
import { UserModel } from '@api/user/models/user.model';

export interface IDataLoaders {
  betsByUserIdLoader: DataLoader<BetModel['userId'], BetModel[], number>;
  userByIdLoader: DataLoader<UserModel['id'], UserModel, number>;
}
