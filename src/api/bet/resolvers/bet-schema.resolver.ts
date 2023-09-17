import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BetSchema } from '../schemes/bet.schema';
import { UserSchema } from '../../user/schemes/user.schema';
import { IDataLoaders } from '@core/graphql/data-loader/data-loader.interface';

@Resolver(() => BetSchema)
export class BetSchemaResolver {
  @ResolveField(() => UserSchema)
  public async user(
    @Parent() { userId }: BetSchema,
    @Context() { loaders }: { loaders: IDataLoaders },
  ): Promise<UserSchema> {
    return await loaders.userByIdLoader.load(userId);
  }
}
