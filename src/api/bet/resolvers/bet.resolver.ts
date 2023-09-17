import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BasePaginationArgs } from '@common/abstraction/schemes/base-pagination.input';
import { BetListSchema } from '../schemes/bet-list.schema';
import { BetService } from '../bet.service';
import { BetSchema } from '../schemes/bet.schema';

@Resolver()
export class BetResolver {
  constructor(private readonly service: BetService) {}

  @Query(() => BetListSchema)
  public async getBetList(
    @Args() pagination: BasePaginationArgs,
  ): Promise<BetListSchema> {
    return this.service.findAll(pagination);
  }

  @Query(() => BetSchema, { nullable: true })
  public async getBet(
    @Args({
      name: 'id',
      type: () => Int,
    })
    id: number,
  ): Promise<BetSchema> {
    return this.service.findById(id);
  }

  @Query(() => BetListSchema)
  public async getBestBetPerUser(
    @Args() pagination: BasePaginationArgs,
  ): Promise<BetListSchema> {
    return this.service.getBestBetPerUser(pagination);
  }


  @Mutation(() => BetSchema)
  public async createBet(
    @Args({
      name: 'userId',
      type: () => Int,
    })
    userId: number,
    @Args({
      name: 'betAmount',
      type: () => Int,
    })
    betAmount: number,
  ): Promise<BetSchema> {
    return this.service.createBet(userId, betAmount);
  }
}
