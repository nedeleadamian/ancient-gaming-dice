import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BetSchema } from './bet.schema';

@ObjectType()
export class BetListSchema {
  @Field(() => Int)
  public count: number;

  @Field(() => [BetSchema])
  public data: BetSchema[];
}
