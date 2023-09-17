import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BetModel } from './models/bet.model';
import { BasePaginationArgs } from '@common/abstraction/schemes/base-pagination.input';
import { BetListSchema } from './schemes/bet-list.schema';
import { UserModel } from '../user/models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { PopulatePaginationSort } from '@common/utils/populate-pagination-sort';
import { Op } from 'sequelize';

@Injectable()
export class BetService {
  private readonly logger = new Logger(BetService.name);
  constructor(
    @InjectModel(BetModel)
    private betModel: typeof BetModel,
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private sequelize: Sequelize,
  ) {}
  async findById(id: number): Promise<BetModel | null> {
    return this.betModel.findByPk(id);
  }

  async findAll(pagination: BasePaginationArgs): Promise<BetListSchema> {
    const options = PopulatePaginationSort(
      pagination.sort,
      BetModel.SortableFields,
      {
        limit: pagination.limit,
        offset: (pagination.page - 1) * pagination.limit,
      },
    );

    const dbResult = await this.betModel.findAndCountAll(options);

    return {
      count: dbResult.count,
      data: dbResult.rows,
    };
  }

  async getBestBetPerUser(
    pagination: BasePaginationArgs,
  ): Promise<BetListSchema> {
    const options = PopulatePaginationSort(
      pagination.sort,
      BetModel.SortableFields,
      {
        where: {
          id: {
            [Op.eq]: this.sequelize.literal(
              `(select b2.id from bets b2 where b2.user_id = "BetModel".user_id and b2.win is true order by b2.bet_amount / b2.chance DESC limit 1)`,
            ),
          },
        },
        limit: pagination.limit,
        offset: (pagination.page - 1) * pagination.limit,
      },
    );

    const dbResult = await this.betModel.findAndCountAll(options);

    return {
      count: dbResult.count,
      data: dbResult.rows,
    };
  }

  async createBet(userId: number, betAmount: number): Promise<BetModel> {
    try {
      return this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        const dbUser = await this.userModel.findByPk(userId, transactionHost);

        if (!dbUser) {
          throw new BadRequestException('User not found');
        }

        if (dbUser.balance < betAmount) {
          throw new BadRequestException('User has insufficient money');
        }

        const chance = Math.random() * 100;
        const win = chance >= 50;
        const payout = win ? betAmount * 2 : 0;

        await dbUser.decrement('balance', {
          by: betAmount,
          ...transactionHost,
        });

        const dbBet = await this.betModel.create(
          {
            userId,
            betAmount,
            chance,
            payout,
            win,
          },
          transactionHost,
        );

        if (dbBet.win) {
          await dbUser.increment('balance', {
            by: betAmount,
            ...transactionHost,
          });
        }

        return dbBet;
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
