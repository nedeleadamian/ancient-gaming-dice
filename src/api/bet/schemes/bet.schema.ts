import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseSchema } from '@common/abstraction/schemes/base.schema';

@ObjectType({ implements: BaseSchema })
export class BetSchema extends BaseSchema {
  @Field(() => Float)
  public betAmount: number;
  @Field(() => Float)
  public chance: number;
  @Field(() => Float)
  public payout: number;
  @Field(() => Float)
  public win: boolean;
  @Field(() => Int)
  public userId: number;
}
