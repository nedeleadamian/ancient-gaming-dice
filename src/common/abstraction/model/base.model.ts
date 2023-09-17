import { Model, Column } from 'sequelize-typescript';

export abstract class BaseModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  public id!: number;

  @Column({ field: 'created_at' })
  public createdAt?: Date;

  @Column({ field: 'updated_at' })
  public updatedAt?: Date;
}
