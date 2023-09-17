import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '@api/user/models/user.model';
import { Op } from 'sequelize';

@Injectable()
export class UserByIdLoader {
  readonly batchLoadFunction: DataLoader<UserModel['id'], UserModel, number>;

  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {
    this.batchLoadFunction = new DataLoader<UserModel['id'], UserModel>(
      this.batchLoadBetsByUserId.bind(this),
    );
  }

  async batchLoadBetsByUserId(ids: number[]): Promise<UserModel[]> {
    const users = await this.userModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    // Group users by id
    const usersMap = new Map<number, UserModel>();

    users.forEach((user: UserModel) => {
      const id = user.id;
      if (!usersMap.has(id)) {
        usersMap.set(id, user);
      }
    });

    return ids.map((userId) => usersMap.get(userId) || null);
  }

  load(userId: number): Promise<UserModel> {
    return this.batchLoadFunction.load(userId);
  }
}
