import { BaseModel } from '@common/abstraction/model/base.model';
import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { UserModel } from '../../user/models/user.model';

@Table({ tableName: 'bets' })
export class BetModel extends BaseModel {
  static SortableFields = [
    'id',
    'betAmount',
    'chance',
    'payout',
    'win',
    'userId',
    'createdAt',
    'updatedAt',
  ];

  @Column({ type: DataType.REAL, field: 'bet_amount' })
  public betAmount: number;

  @Column({ type: DataType.REAL, validate: { min: 0, max: 100 } })
  public chance: number;

  @Column({ type: DataType.REAL })
  public payout: number;

  @Column
  public win: boolean;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  public userId: number;

  @BelongsTo(() => UserModel)
  public user: UserModel;
}
