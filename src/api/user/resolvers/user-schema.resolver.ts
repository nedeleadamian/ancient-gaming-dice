import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserSchema } from '../schemes/user.schema';
import { BetSchema } from '../../bet/schemes/bet.schema';
import { IDataLoaders } from '@core/graphql/data-loader/data-loader.interface';

@Resolver(() => UserSchema)
export class UserSchemaResolver {
  @ResolveField(() => [BetSchema])
  public async bets(
    @Parent() { id }: UserSchema,
    @Context() { loaders }: { loaders: IDataLoaders },
  ): Promise<BetSchema[]> {
    const dbBets = await loaders.betsByUserIdLoader.load(id);
    return dbBets || [];
  }
}
