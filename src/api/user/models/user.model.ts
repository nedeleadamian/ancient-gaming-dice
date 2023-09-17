import { BaseModel } from '@common/abstraction/model/base.model';
import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { BetModel } from '../../bet/models/bet.model';
@Table({ tableName: 'users' })
export class UserModel extends BaseModel {
  static SortableFields = ['id', 'name', 'balance', 'createdAt', 'updatedAt'];

  @Column({ type: DataType.TEXT })
  public name: string;

  @Column({ type: DataType.REAL })
  public balance: number;

  @HasMany(() => BetModel)
  public bets: BetModel[];
}
