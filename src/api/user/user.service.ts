import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { BasePaginationArgs } from '@common/abstraction/schemes/base-pagination.input';
import { UserListSchema } from './schemes/user-list.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async findById(id: number) {
    return this.userModel.findByPk(id);
  }

  async findAll(pagination: BasePaginationArgs): Promise<UserListSchema> {
    const options = {
      limit: pagination.limit,
      offset: (pagination.page - 1) * pagination.limit,
    };

    const validSortFields = pagination.sort.filter((sort) =>
      UserModel.SortableFields.includes(sort.field),
    );

    if (validSortFields.length) {
      options['order'] = validSortFields.map((sort) => [
        sort.field,
        sort.order,
      ]);
    }

    const dbResult = await this.userModel.findAndCountAll(options);

    return {
      count: dbResult.count,
      data: dbResult.rows,
    };
  }
}
