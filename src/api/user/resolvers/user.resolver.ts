import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { BasePaginationArgs } from '@common/abstraction/schemes/base-pagination.input';
import { UserListSchema } from '../schemes/user-list.schema';
import { UserSchema } from '../schemes/user.schema';

@Resolver()
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => UserListSchema)
  public async getUserList(
    @Args() pagination: BasePaginationArgs,
  ): Promise<UserListSchema> {
    return this.service.findAll(pagination);
  }

  @Query(() => UserSchema)
  public async getUser(
    @Args({
      name: 'id',
      type: () => Int,
    })
    id: number,
  ): Promise<UserSchema> {
    return this.service.findById(id);
  }
}
