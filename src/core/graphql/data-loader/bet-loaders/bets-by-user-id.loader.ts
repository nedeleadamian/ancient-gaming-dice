import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { BetModel } from '@api/bet/models/bet.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BetsByUserIdLoader {
  readonly batchLoadFunction: DataLoader<
    BetModel['userId'],
    BetModel[],
    number
  >;

  constructor(
    @InjectModel(BetModel)
    private betModel: typeof BetModel,
  ) {
    this.batchLoadFunction = new DataLoader<BetModel['userId'], BetModel[]>(
      this.batchLoadBetsByUserId.bind(this),
    );
  }

  async batchLoadBetsByUserId(userIds: number[]): Promise<BetModel[][]> {
    const bets = await this.betModel.findAll({
      where: {
        userId: userIds,
      },
    });

    // Group bets by userId
    const userBetsMap = new Map<number, BetModel[]>();
    bets.forEach((bet: BetModel) => {
      const userId = bet.userId;
      if (!userBetsMap.has(userId)) {
        userBetsMap.set(userId, []);
      }
      userBetsMap.get(userId)?.push(bet);
    });

    return userIds.map((userId) => userBetsMap.get(userId) || []);
  }

  load(userId: number): Promise<BetModel[]> {
    return this.batchLoadFunction.load(userId);
  }
}
